import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { Navbar } from './app/Navbar';
import { Home } from './components/home';
import { PostsList } from './components/posts';
import { SinglePost } from './components/singlePost';

function App() {
  return (
<Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            component={Home}
          />
          <Route
            exact
            path="/posts"
            component={PostsList}
          />
          <Route
            exact
            path="/posts/:postId"
            component={PostsList}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
