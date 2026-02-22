# Connecting to Websocket

Nerimity uses [Socket.IO](https://socket.io/) with only the `"websocket"` transport enabled.
This means you should explicitly force websocket transport in your client options.

#### WebSocket URL

```
WS https://nerimity.com
```

You can use the [SocketIO Client](https://socket.io/docs/) to connect to the WebSocket Server.

## Example

```js
import io from "socket.io-client";

const socket = io("https://nerimity.com", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  socket.emit("user:authenticate", { token: "YOUR_TOKEN" });
});

socket.on("user:authenticated", (payload) => {
  console.log("Authenticated:", payload);
});
```

## Voice flow (WebRTC + websocket signaling)

Voice connections are peer-to-peer (WebRTC). The websocket is used for signaling.
You still need HTTP endpoints for join/leave, and websocket events for peer signal exchange.

1. Connect/authenticate your websocket.
2. Join the voice channel with `POST /api/channels/{CHANNEL_ID}/voice/join`.
3. Exchange signaling data using `voice:signal_send` and `voice:signal_received`.
4. Handle `voice:user_joined` and `voice:user_left` to manage peers.
5. Leave with `POST /api/channels/{CHANNEL_ID}/voice/leave`.

> [!NOTE]
> `socketId` in the join request must be your current active websocket id.
> If the socket reconnects, call join again with the new id.

### Voice signaling example

```js
import io from "socket.io-client";
import fetch from "node-fetch";
import Peer from "simple-peer";

const token = "YOUR_TOKEN";
const channelId = "YOUR_CHANNEL_ID";
const remoteUserId = "YOUR_REMOTE_USER_ID";

let socket = null;
let peer = null;

async function start() {
  console.log("Starting voice test...");
  console.log("Channel:", channelId);
  console.log("Remote user:", remoteUserId);

  const wrtc = await import("@koush/wrtc").then((m) => m.default || m);
  // if you want to send audio
  const source = new wrtc.nonstandard.RTCAudioSource();
  const track = source.createTrack();
  track.enabled = true;
  const stream = new wrtc.MediaStream();
  stream.addTrack(track);

  socket = io("https://nerimity.com", { transports: ["websocket"] });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
  });

  socket.on("connect", async () => {
    console.log("Socket connected:", socket.id);

    socket.emit("user:authenticate", { token });
    socket.once("user:authenticated", async () => {
      const joinRes = await fetch(
        `https://nerimity.com/api/channels/${channelId}/voice/join`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ socketId: socket.id }),
        },
      );

      console.log("Voice join:", joinRes.status);
    });
  });

  peer = new Peer({
    initiator: false,
    trickle: true,
    wrtc,
    stream, // if you want to send audio
  });

  peer.on("signal", (signal) => {
    socket.emit("voice:signal_send", {
      channelId,
      toUserId: remoteUserId, //because it is still p2p, you would need to connect to every user
      signal,
    });
  });

  socket.on("voice:signal_received", ({ signal }) => {
    peer.signal(signal);
  });

  peer.on("connect", () => {
    console.log("peerConnect", remoteUserId);
  });

  peer.on("error", (err) => {
    console.error("Peer error:", err.message);
  });

  socket.on("voice:user_joined", (payload) => {
    console.log("User joined voice:", payload);
  });

  socket.on("voice:user_left", (payload) => {
    console.log("User left voice:", payload);
  });
}

await start();
```
