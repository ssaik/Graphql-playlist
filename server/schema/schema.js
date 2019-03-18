const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema
    } = graphql;

//Dummy Data
// var books = [
//     {name: 'Name of the Wind', genre: 'Fantasy', id:'1', authorid: '1'},
//     {name: 'The Final Empire', genre: 'Fantasy', id:'2', authorid: '2'},
//     {name: 'The Long Earth', genre: 'Sci-Fi', id:'3', authorid: '3'},
//     {name: 'Name of the Wind2', genre: 'Fantasy', id:'4', authorid: '1'},
//     {name: 'The Final Empire2', genre: 'Fantasy', id:'5', authorid: '2'},
//     {name: 'The Long Earth2', genre: 'Sci-Fi', id:'6', authorid: '3'}
// ];

// var authors = [
//     {name: 'Ramu', age: 22, id:'1'},
//     {name: 'Raju', age: 33, id:'2'},
//     {name: 'Rajesh', age: 44, id:'3'}
// ];

//This is like Metadata of the object/table
//we are creating book object
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type:GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // return _.find(authors, {id: parent.authorid});
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type:GraphQLID},
        age: {type: GraphQLInt},
        name: {type: GraphQLString},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return _.filter(books, { authorid: parent.id })
            }
        }
    })
});

//This is creating api, when we call "book(id:123){name genre}" we need to get the data.
//So, creating an api.
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                //code to get data from db /other source
                //Example, MongoDB or Google Firebase
                // return _.find(books, {id: args.id})
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                //code to get data from db /other source
                //Example, MongoDB or Google Firebase
                // return _.find(authors, {id: args.id})
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})