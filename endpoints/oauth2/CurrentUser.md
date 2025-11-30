# OAuth 2 Current User

Get the current user using an access token.

#### Endpoint

```
GET https://nerimity.com/api/oauth2/users/current
```

| Header        | Description   |
| ------------- | ------------- |
| Authorization | Access token. |

#### Example

#### Response:

```ts
  email?: string
  block: boolean
  user: Post
  latestPost: Post
  profile: Profile
```
