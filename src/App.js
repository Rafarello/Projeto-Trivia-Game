import React from 'react';
import './App.css';
import Content from './componets/content';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/tela-de-jogo" component={ TelaDeJogo } />
        <Route path="/settings" component={ Settings } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}
