const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

//connect to mongoDB
mongoose.connect('mongodb+srv://saikiran:saikiran@ssaikgraphqlcluster-rnku5.mongodb.net/test?retryWrites=true', { useNewUrlParser: true }, function(error){
    console.log(error)
});
mongoose.connection.once('open',() => {
    console.log('connected to DB');
});

app.use('/graphql',graphqlHTTP({
    // schema : schema,
    schema,
    graphiql : true
}));

app.listen(4000,() => {
    console.log('Listening on port 4000')
});

