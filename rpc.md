# RPC

RPC is a way to locally interact with Nerimity. It allows you to send rich activity to Nerimity. For example, showing which music you're listening to, along with the progress bar, art and url.

## Connecting

There are currently 2 ways to connect to RPC:

[WebSocket Server For The Desktop App](#websocket-server-for-the-desktop-app)  
[Post Message Through Browser](#post-message-through-browser)

# WebSocket Server For The Desktop App

You can connect to the desktop app by using the WebSocket Server.

To find the localhost port for the WebSocket Server, you will need to:

1. Scan through port ranges `6463` to `6472`.
2. Connect to each port, (`ws://localhost:6464/?appId=123455678987654321`) and see if `HELLO_NERIMITY_RPC` is received.
3. if it is not received, try the next port.
4. if it is received, You are now connected to the WebSocket Server.

You can now emit events to the websocket server.

```ts
{
  type: 'UPDATE_RPC',
  data: {
    name: string;
    link?: string;
    action?: string;
    title?: string;
    subtitle?: string;
    imgSrc?: string;
    startedAt?: number;
    endsAt?: number;
  }
}
```

[RPC Data Types](/types/RPC.md)  
To clear the RPC, send the above event but with data set to null.

# Post Message Through Browser

You can post messages using iframe or Chrome/FireFox Extensions.

When Nerimity finishes authenticating, it will post a message `NERIMITY_READY` to the parent window. This means that the client is ready to accept events.

To Listen to the `NERIMITY_READY` message, you can use the following code:

```js
window.onmessage = (event) => {
  if (event.data === "NERIMITY_READY") {
    // Nerimity is ready
  }
};
```

After the `NERIMITY_READY` message is received, you can send messages to Nerimity by using the `postMessage` function.

```ts
document.getElementById('cross_domain_page').contentWindow.postMessage({
  type: 'UPDATE_RPC',
  data: {
    name: string;
    link?: string;
    action?: string;
    title?: string;
    subtitle?: string;
    imgSrc?: string;
    startedAt?: number;
    endsAt?: number;
  }
})
```

[RPC Data Types](/types/RPC.md)  
To clear the RPC, send the above event but with data set to null.
