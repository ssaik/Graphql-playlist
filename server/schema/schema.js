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
    GraphQLNonNull,
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
                return Author.findById(parent.authorId);
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
                return Book.find({authorId: parent.id})
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
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                //code to get data from db /other source
                //Example, MongoDB or Google Firebase
                // return _.find(authors, {id: args.id})
                return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return books
                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // return authors
                return Author({})
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args) {
                //Author() is Model which is imported from models
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();  //save() is function from MongoDB, data Saves to MongoDB
            }
        },
        
        addBook: {
            type: BookType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId : {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                //Book() is Model which is imported from models
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();  //save() is function from MongoDB, data Saves to MongoDB
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})