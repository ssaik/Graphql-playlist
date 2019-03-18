### GrapghQL-Playlist

mkdir server

cd server

npm init

npm install express

npm install -g nodemon  --> to restart server automatically

npm install graphql express-graphql

npm install lodash --> help us to load the data
//If nothing is setup in backend DB, temp use loadash to get dummy data which is defined in schema.


##Now it's time to setup MongoDB - MLab
Create account and create database user
get link
username: SsaiK
password: sai123
**Whitelist IP address.

npm install mongoose


##Mutations:
    Mutations: delete, update, create data.

    Create a mutation in schema.
    
    mutation {
        addAuthor(name: "baludu", age: 30) {
            name
            age
        }
    }


##Validate Data
Validate notNull by new GraphQLNotNull(...)