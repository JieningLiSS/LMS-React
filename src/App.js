import React from 'react';
import './App.css';
import {Home} from './components/Home'
import {Author} from './components/Author'
import {Book} from './components/Book'
import {Navigation} from './components/Navigation'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <h3 className="m-3 d-flex justify-content-center">
      React JS Demo</h3>
      
      <Navigation/>

      <Switch>
      <Route path='/' component={Home} exact />
      <Route path='/authors' component={Author}/>
      <Route path='/books' component={Book}/>
      </Switch>

    </div>
    </BrowserRouter>
  );
}

export default App;
