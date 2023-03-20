const { AuthenticationError } = require("apollo-server-express");
const {} = require("../models");
const { signToken } = require("../utils/auth");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {},
  Mutation: {},
};
module.exports = resolvers;
