# Exchange Code

Exchange an authorization code or refresh token for an access token.

#### Endpoint

```
POST https://nerimity.com/api/oauth2/token
```

| Query        | Description                             | grantType          |
| ------------ | --------------------------------------- | ------------------ |
| grantType    | `authorization_code` or `refresh_token` | Both               |
| clientId     | Your application id                     | Both               |
| redirectUri  | Your application redirect uri           | authorization_code |
| code         | Your authorization code                 | authorization_code |
| refreshToken | Your refreshToken token                 | refresh_token      |
| clientSecret | Your application secret                 | Both               |

#### Example

```
 https://nerimity.com/api/oauth2/token?grantType=authorization_code&clientId=123&redirectUri=http%3A%2F%2Fgoogle.com&code=1234&clientSecret=1234
```

#### Response:

```json
{
  "accessToken": "1234",
  "expiresIn": 86400,
  "refreshToken": "5678"
}
```
