import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import TelaDeJogo from './pages/TelaDeJogo';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/tela-de-jogo" component={ TelaDeJogo } />
        <Route path="/" component={ Login } />
      </Switch>
    </div>
  );
}
