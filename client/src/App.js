import React from "react";
import { Switch, useHistory, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Missing from "./components/Missing";

const httpLink = createHttpLink({
  uri: "/graphql",
});

//we haven't logged a user in so the token error is coming from here
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*" component={Missing} />
      </Switch>
      <Footer />
    </ApolloProvider>
  );
}

export default App;
