import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import TelaDeJogo from '../pages/TelaDeJogo';
import Settings from '../pages/Settings';
import Feedback from '../pages/Feedback';
import Ranking from '../pages/Ranking';

class Content extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/tela-de-jogo" component={ TelaDeJogo } />
          <Route path="/settings" component={ Settings } />
          <Route path="/feedback" component={ Feedback } />
          <Route path="/ranking" component={ Ranking } />
          <Route exact path="/" component={ Login } />
        </Switch>
      </div>
    );
  }
}

export default Content;
