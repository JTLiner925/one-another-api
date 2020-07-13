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

# Express Boilerplate!

This is a boilerplate project used for starting new projects!

## Set up

Complete the following steps to start a new project (NEW-PROJECT-NAME):

1. Clone this repository to your local machine `git clone BOILERPLATE-URL NEW-PROJECTS-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`
6. Edit the contents of the `package.json` to use NEW-PROJECT-NAME instead of `"name": "express-boilerplate",`

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.