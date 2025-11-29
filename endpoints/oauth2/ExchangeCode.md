# Exchange Code

Ban a member from a server. You must be a server owner/have permission to ban.

#### Endpoint

```
POST https://nerimity.com/api/oauth2/token
```

| Query        | Description                             |
| ------------ | --------------------------------------- |
| grantType    | `authorization_code` or `refresh_token` |
| clientId     | Your application id                     |
| redirectUri  | Your application redirect uri           |
| code         | Your authorization code                 |
| clientSecret | Your application secret                 |

#### Example

```
 https://nerimity.com/api/oauth2/token?grantType=authorization_code&clientId=123&redirectUri=http%3A%2F%2Fgoogle.com&code=1234&clientSecret=1234
```

#### Response:

```json
{ "status": true }
```
