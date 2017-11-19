import {GraphQLBoolean, GraphQLList, GraphQLObjectType} from "graphql";
import {pick} from "lodash";

import ErrorType from "./ErrorType";
import db from "../models/index";

export const generateResponseType = (Type, name) => {
    return new GraphQLObjectType({
        name: name,
        fields: () => ({
            ok: {
                type: GraphQLBoolean
            },
            errors: {
                type: new GraphQLList(ErrorType)
            },
            result: {
                type: Type
            }
        })
    });
};

export const formatErrors = (error, path = 'Unknown', message = 'Something went wrong') => {
    if (error && error instanceof db.sequelize.ValidationError) {
        return error.errors.map(x => pick(x, ['path', 'message']));
    }

    return [{path: path, message: message}]
};