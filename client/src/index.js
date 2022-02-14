import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Routing
import { BrowserRouter } from "react-router-dom";
// Redux
import {Provider} from "react-redux";
import {appStore} from "./redux/appStore";
// ContextAPI
import {MainContextProvider} from "./context/main-context/main.context"
// Apollo
import { 
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import client from './Apollo/apolloClient';
// const client = new ApolloClient({
//   uri: 'http://localhost:4000/graphql',
//   cache: new InMemoryCache()
// });

ReactDOM.render(
  <BrowserRouter>
    <MainContextProvider>
      <ApolloProvider client={client}>
        <Provider store={appStore}>
          <App/>
        </Provider>
      </ApolloProvider>
    </MainContextProvider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
