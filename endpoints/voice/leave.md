# Leave Voice Channel

Leave a voice channel and stop voice signaling.

#### Endpoint

```txt
POST https://nerimity.com/api/channels/{CHANNEL_ID}/voice/leave
```

| Header        | Description          |
| ------------- | -------------------- |
| Authorization | Your User/Bot token. |

#### Example

```js
const res = await fetch(`https://nerimity.com/api/channels/${channelId}/voice/leave`, {
  method: "POST",
  headers: { Authorization: token },
});

const data = await res.json();
```

#### Response

```json
{ "success": true }
```
