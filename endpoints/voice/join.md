# Join Voice Channel

Join a voice channel so the current user can begin voice signaling.

#### Endpoint

```txt
POST https://nerimity.com/api/channels/{CHANNEL_ID}/voice/join
```

| Header        | Description          |
| ------------- | -------------------- |
| Authorization | Your User/Bot token. |
| Content-Type  | `application/json`   |

| Body (JSON) | Type   | Description                                                  |
| ----------- | ------ | ------------------------------------------------------------ |
| socketId    | String | Your current authenticated websocket id (`client.socket.id`) |

> [!NOTE]
> Make sure your websocket is connected and authenticated before calling this endpoint.

#### Example

```js
const res = await fetch(`https://nerimity.com/api/channels/${channelId}/voice/join`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
  body: JSON.stringify({ socketId: socket.id }),
});

const data = await res.json();
```

#### Response

```json
{ "success": true }
```
