Instructions for future contributors:
- Install mongoDB
- Download the mongoDB dump (if you have one)
- Import the dump into mongoDB, name the database pitdb
- You can use Robo3T to view the database and verify the import/installation

- Install node.js
- Install create-react-app
- Install yarn
- Do yarn global add typescript (cmd)

- Clone the repository
- In the client directory, do yarn install (cmd)
- In the server directory, do yarn install (cmd)
- In the server directory, create a .env file, Put DB='mongodb://127.0.0.1:27017/pitdb' inside the .env file (the address might be different for you, but it should be the same since this is the default address) Also put CLIENT_BUILD_PATH='../../client/build'

- In the server directory, do yarn dev, this should start the server and open up a new browser tab with the website.
