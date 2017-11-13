import {
    GraphQLFloat, GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} from "graphql";

import db from './models';

db.user.findAll().then(result => {
    console.log(result);
});

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Owner of the budget.',
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        username: {
            type: GraphQLString
        },
        expenses: {
            type: new GraphQLList(ExpenseType)
        },
        categories: {
            type: new GraphQLList(CategoryType)
        }
    })
});

const ExpenseType = new GraphQLObjectType({
    name: 'Expense',
    description: 'An expense of the user',
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        price: {
            type: GraphQLFloat
        },
        date: {
            type: GraphQLString
        },
        category: {
            type: CategoryType
        }
    })
});

const CategoryType = new GraphQLObjectType({
    name: 'Category',
    description: 'A category for expenses',
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        name: {
            type: GraphQLString
        },
        expenses: {
            type: new GraphQLList(ExpenseType)
        }
    })
});

export const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: 'query',
        fields: () => ({
            user: {
                type: UserType,
                args: {
                    id: {type: GraphQLInt}
                },
                resolve: (root, args) => ({
                    "id": 1,
                    "username": "John Doe",
                    "expenses": [
                        {
                            "id": 1,
                            "price": 13,
                            "date": "2017-11-12T10:15:00",
                            "category": {
                                "id": 1,
                                "name": "Food"
                            }
                        }
                    ]
                })
            }
        })
    })
});