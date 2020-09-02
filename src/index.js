import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient /* , gql */ } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { PersistGate } from 'redux-persist/integration/react';
import { resolvers, typeDefs } from './graphql/resolvers';
import App from './App.jsx';
import store, { persistor } from './redux/store';
import * as serviceWorker from './serviceWorker';

const httpLink = createHttpLink({
	uri: 'https://crwn-clothing.com',
});

const cache = new InMemoryCache();

const client = new ApolloClient({
	link: httpLink,
	cache,
	resolvers,
	typeDefs,
});

/* client
	.query({
		query: gql`
			{
				getCollectionsByTitle(title: "Hats") {
					id
					title
					items {
						id
						name
					}
				}
			}
		`,
	})
	.then((res) => console.log(res)); */

client.writeData({
	data: {
		cartHidden: true,
	},
});

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<Provider store={store}>
				<BrowserRouter>
					<PersistGate persistor={persistor}>
						<App />
					</PersistGate>
				</BrowserRouter>
			</Provider>
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
