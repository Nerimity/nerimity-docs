# Authenticate

Authenticate your websocket session after connecting.

#### Event

```txt
user:authenticate
```

| Payload (JSON) | Type   | Description          |
| -------------- | ------ | -------------------- |
| token          | String | Your User/Bot token. |

#### Example

```js
socket.emit("user:authenticate", { token: "YOUR_TOKEN" });
```
