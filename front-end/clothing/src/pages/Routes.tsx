import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApplicationView } from '../components/ApplicationView';
import { Help } from './Help';
import { Home } from './Home';
import { Inventory } from './Inventory';

interface RoutesProps {

}

export const Routes: React.FC<RoutesProps> = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <ApplicationView>
          <Route path="/help">
            <Help />
          </Route>
          <Route path="/inventory">
            <Inventory />
          </Route>
        </ApplicationView>
      </Switch>
    </Router>
  );
}