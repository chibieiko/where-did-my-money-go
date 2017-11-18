import {GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";

import UserType from './types/UserType';
import db from './models';
import {addUser} from './mutations/userMutations';

export default new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser
    }
});