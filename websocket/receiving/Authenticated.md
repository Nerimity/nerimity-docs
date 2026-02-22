# Authenticated

Received after a successful `user:authenticate` event.

#### Event

```txt
user:authenticated
```

| Payload | Type | Description |
| ------- | ---- | ----------- |
| result  | Any  | Authentication result payload. |

#### Example

```js
socket.on("user:authenticated", (payload) => {
  console.log("Authenticated:", payload);
});
```
