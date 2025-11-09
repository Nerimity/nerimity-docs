# RPC Data

| key       | Type    | Description                                               | Max Length |
| --------- | ------- | --------------------------------------------------------- | ---------- |
| name      | String  | The name of the activity.                                 | 40         |
| link      | String? | The url of the activity.                                  | 200        |
| action    | String  | The action of the activity. (Playing, Watching, etc)      | 20         |
| title     | String? | The title of the activity.                                | 50         |
| subtitle  | String? | The subtitle of the activity.                             | 50         |
| imgSrc    | String? | The image of the activity.                                | 200        |
| editedAt  | Number? | Timestamp for when the message was edited .               | -          |
| startedAt | Number? | Timestamp for when the activity started.                  | -          |
| endsAt    | Number? | Timestamp for when the activity ends. Shows progress bar. | -          |
