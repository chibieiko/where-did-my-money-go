import {formatErrors, generateResponseType} from "../types/ResponseType";
import ExpenseType from "../types/ExpenseType";
import {GraphQLInt, GraphQLNonNull, GraphQLString} from "graphql";
import db from "../models/index";
import CategoryType from "../types/CategoryType";

export const addExpense = {
    type: generateResponseType(ExpenseType, 'addExpenseResponse'),
    args: {
        price: {type: new GraphQLNonNull(GraphQLInt)},
        description: {type: GraphQLString},
        date: {type: GraphQLString},
        userId: {type: new GraphQLNonNull(GraphQLInt)},
        categoryId: {type: new GraphQLNonNull(GraphQLInt)}
    },
    resolve(parentValue, args) {
        // check that user exists and he has that category
        return db.user.find(
            {include: [db.category]},
            {where: {id: args.userId}})
            .then(user => {
                if (user && user.categories.some((category) => category.id == args.categoryId)) {
                    // add expense
                    let newExpense = db.expense.build({
                        price: args.price,
                        description: args.description,
                        date: args.date,
                        userId: args.userId,
                        categoryId: args.categoryId
                    });

                    return newExpense.save()
                        .then(category => {
                            return {
                                ok: true,
                                result: category
                            };
                        })
                        .catch(error => {
                            return {
                                ok: false,
                                errors: formatErrors(error)
                            };
                        })
                } else {
                    return {
                        ok: false,
                        errors: formatErrors(null, 'userId & categoryId',
                            'User with userId must exist and own a category that corresponds to given categoryId.')
                    };
                }
            })
            .catch(error => {
                return {
                    ok: false,
                    errors: formatErrors(error)
                };
            })
    }
};

export const updateExpense = {
    type: generateResponseType(ExpenseType, 'updateExpenseResponse'),
    args: {
        id: {type: new GraphQLNonNull(GraphQLInt)},
        userId: {type: new GraphQLNonNull(GraphQLInt)},
        categoryId: {type: GraphQLInt},
        price: {type: GraphQLInt},
        description: {type: GraphQLString},
        date: {type: GraphQLString}
    },
    resolve: async (parentValue, args) => {
        let includeArray = [db.user];
        // Include user's categories if one wants to update categoryId.
        if (args.categoryId) {
            includeArray = [{
                model: db.user,
                include: [{
                    model: db.category
                }]
            }];
        }

        let expense = await db.expense.find(
            {include: includeArray},
            {
                where: {
                    id: args.id,
                    userId: args.userId
                }
            });

        if (args.categoryId &&
            expense.user.categories.filter(category => category.id === args.categoryId).length < 1) {
            return {
                ok: false,
                errors: formatErrors(null, 'categoryId', 'User does not own given categoryId.')
            };
        }

        return db.expense.update({
                categoryId: args.categoryId,
                price: args.price,
                description: args.description,
                date: args.date
            },
            {
                where: {
                    id: args.id,
                    userId: args.userId
                }
            })
            .then(result => {
                if (result[0] == 1) {
                    return {
                        ok: true,
                    };
                } else {
                    return {
                        ok: false,
                        errors: formatErrors(null)
                    };
                }
            })
            .catch(error => {
                return {
                    ok: false,
                    errors: formatErrors(error)
                };
            });
    }
};

export const deleteExpense = {
    type: generateResponseType(CategoryType, 'deleteExpenseResponse'),
    args: {
        id: {type: new GraphQLNonNull(GraphQLInt)},
        userId: {type: new GraphQLNonNull(GraphQLInt)}
    },
    resolve(parentValue, args) {
        return db.expense.destroy({
            where: {
                ...args
            }
        })
            .then(result => {
                if (result == 1) {
                    return {
                        ok: true,
                    };
                } else {
                    return {
                        ok: false,
                        errors: formatErrors(null)
                    };
                }
            })
            .catch(error => {
                return {
                    ok: false,
                    errors: formatErrors(error)
                };
            })
    }
};