import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LeagueSummary from './pages/LeagueSummary';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={<Home />} 
          />
          <Route 
            path="/leagueSummary" 
            element={<LeagueSummary />} 
          />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
