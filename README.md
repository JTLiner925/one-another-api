# oneAnother

## https://oneanother.now.sh/

![](/homepage.png)
screenshot of the homepage in desktop and mobile version

### oneAnother Client Repo: https://github.com/JTLiner925/oneanother

NodeJS/Express/PostgreSQL

## oneAnother API Overview

The oneAnother API provides the database to store the users, groups, and events for oneAnother. 

### Authorization

You will not need authorization for making a POST to the users endpoint but we will use a token created when the user logs on for Authorization for creating groups or events.
Authorization with go in the headers.

Authorization: `Bearer ${window.localStorage.getItem("token")}`

### Endpoints

We provide the following API endpoints:

GET requests:
- /api/users
- /api/groups
- /api/events

POST requests:
- /api/users/login  (user_email, user_password)
- /api/users/signup  (user_email, user_password, first_name)
- /api/groups/joingroup  (group_name)
- /api/groups/creategroup  (leader_phone, group_location, time_date, )
- /api/events/createevent  (event_date, event_time, lesson_title, bible_passage, question)

These endpoints have many optional body requests, required in parenthesis beside endpoint.