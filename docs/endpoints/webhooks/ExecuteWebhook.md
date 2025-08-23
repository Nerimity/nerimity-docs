# Execute Webhook

Create a message in a server channel where webhook is setup.

To create a new webhook:
1. Right click on a server channel, click on settings
1. Find "Webhooks" and click on "Create".

This should give you a webhook url with the token.


#### Endpoint

```
POST https://nerimity.com/api/webhooks/{token}
```

| Body (JSON)    | Type    | Description                                                             |
| -------------- | ------- | ----------------------------------------------------------------------- |
| content        | String  | Your Message content                                                    |
| username        | String  | Username override                                                   |
| avatarUrl        | String  | avatar override (jpg, jpeg, png, webp, gif)                                                  |

#### Response: [Message](/types/Message.md)
