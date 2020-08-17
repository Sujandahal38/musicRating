# musicRating
Music Video Database (rating based on sentiment analysis)

##Instructions

#Start Express server

`npm install` inside `./server/` will install all necessary node_modules.

`npm run dev ` to start express server at https://localhost:5000 as DEVELOPMENT MODE.

`.env` file contains all the necessary environment variables. Including Root admin login credentials.


`npm start` starts the project as production mode :tada:

#REACT Apps:

`./client/admin` for AdminPage.
`./client/user` from userPage.

NOTE:- separate app for user and admin because they do not share UI and any components.
##USED TECHNOLOGIES:

-Puppeteer for youtube scraping and..
-redux for state management.
