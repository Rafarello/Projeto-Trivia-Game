import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import TelaDeJogo from '../pages/TelaDeJogo';
import Settings from '../pages/Settings';

class Content extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/tela-de-jogo" component={ TelaDeJogo } />
          <Route exact path="/" component={ Login } />
          <Route path="/settings" component={ Settings } />
        </Switch>
      </div>
    );
  }
}

export default Content;
