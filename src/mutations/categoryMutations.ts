import {formatErrors, generateResponseType} from "../types/ResponseType";
import CategoryType from "../types/CategoryType";
import {GraphQLInt, GraphQLNonNull, GraphQLString} from "graphql";
import db from "../models/index";

export const addCategory = {
    type: generateResponseType(CategoryType, 'addCategoryResponse'),
    args: {
        userId: {type: new GraphQLNonNull(GraphQLInt)},
        name: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve(parentValue, args) {
        // Check that userId exists in database.
        return db.user.find({where: {id: args.userId}})
            .then(user => {
                if (!user) {
                    return {
                        ok: false,
                        errors: formatErrors(null, 'userId', 'No user found with given id.')
                    };
                }

                const newCategory = db.category.build({
                    userId: args.userId,
                    name: args.name
                });

                return newCategory.save()
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
                    });
            })
            .catch(error => {
                return {
                    ok: false,
                    errors: formatErrors(error)
                };
            });
    }
};

export const updateCategory = {
    type: generateResponseType(CategoryType, 'updateCategoryResponse'),
    args: {
        id: {type: new GraphQLNonNull(GraphQLInt)},
        userId: {type: new GraphQLNonNull(GraphQLInt)},
        name: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve(parentValue, args) {
        return db.category.update({
                name: args.name
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
                        ok: true
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

export const deleteCategory = {
    type: generateResponseType(CategoryType, 'deleteCategoryResponse'),
    args: {
        id: {type: new GraphQLNonNull(GraphQLInt)},
        userId: {type: new GraphQLNonNull(GraphQLInt)}
    },
    resolve(parentValue, args) {
        return db.category.destroy({
            where: {
                ...args
            }
        })
            .then(result => {
                if (result == 1) {
                    return {
                        ok: true
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