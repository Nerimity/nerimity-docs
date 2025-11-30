# Create Comment
Create a comment on a post by its ID.

#### Endpoint
```
POST https://nerimity.com/api/posts/
```

| Header        | Description                    |
| ------------- | ------------------------------ |
| Authorization | Your User/Bot token.           |

| Body        | Type      | Description                               |
| ----------- | --------- | ----------------------------------------- |
| postId      | String    | The ID of the post to comment on          |
| content     | String    | The content of the comment                |


> [!NOTE]
> This endpoint is currently disabled for bots. It can only be used by users/user tokens.
#### Response: [Post](/types/Post.md)
