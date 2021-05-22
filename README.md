# ALL YOUR TECH ARE BLOG TO US

Full-stack tech blog application using Node.js, Sequelize, Express.js, Handlebars.js and other modules for sessions and encryption.

# Project Description

This is a simple "tech blog" type application where any use is able to view exisiting blog articles or create and account allowing them to make their own blog posts and comments on existing blog posts. When a user is logged in they are also able to delete their own posts or comments.

The project uses Express.js for handling requests/responses, Sequelize/MySQL2 for database handling and their model system to set up tables and relational data systems, Handlebars for view rendering, Dotenv to keep sensitive project information secure, express-sessions for session storage and bcrypt for password encryption.

# Setup/Installation

## Local

First start by making sure all project files have been downloaded and dependencies installed. A sample .env file has been included as ".env.EXAMPLE". Rename this to ".env" and update the username and password variables to your credentials and the secret if you so wish though this can be any string.

## Heroku

This project is also ready for deployment to Heroku using the JAWSDB add-on. You will have to add a secret to your config variables in Heroku.


# Usage Instructions

Once that's all set up, the database can be initialized and a connection established by running "node server.js" in your terminal. For local testing the URL to navigate to is localhost:3001. There is a navigation icon in the top right of the application at all times that will allow you to jump between the home page, your dashboard (if logged in), and the login page (or logout if already logged in). From your dashboard you will be able to make new posts. From any existing post page, if logged in, you will be able to submit a comment.
