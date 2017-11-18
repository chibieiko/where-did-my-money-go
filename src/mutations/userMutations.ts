import {
    GraphQLNonNull,
    GraphQLString
} from "graphql";

import db from "../models/index";
import UserType from "../types/UserType";

export const addUser = {
    type: UserType,
    args: {
        username: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve(parentValue, args) {
        let newUser = db.user.build({
            username: args.username
        });

        return newUser.save()
            .then(user => user)
            .catch(error => {
                console.log(error);
                return error
            })
    }
};