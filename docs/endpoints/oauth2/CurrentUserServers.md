# OAuth 2 Current User

Get the current user servers using an access token.

#### Endpoint

```
GET https://nerimity.com/api/oauth2/users/current/servers
```

| Header        | Description   |
| ------------- | ------------- |
| Authorization | Access token. |

#### Example

#### Response:

```ts
  id: string,
  name: string,
  avatar?: string,
  banner?: string,
  createdById: string,
  createdAt: number,
  hexColor: string,
  verified: boolean,
  systemChannelId: string,
  defaultRoleId: string,
  publicServer: boolean,
```
