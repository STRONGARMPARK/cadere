import React from "react";
import { MainView } from "./components/MainView";
import { SideBar } from "./components/SideBar";
import { Routes } from "./pages/Routes";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { ApplicationView } from "./components/ApplicationView";
import { Help } from "./pages/Help";
import { Inventory } from "./pages/Inventory";

function App() {
  return (
    <MainView>
      <Router>

        <SideBar />

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
    </MainView>
  );
}

export default App;

// <div className="App">
//   <header className="App-header">
//     <img src={logo} className="App-logo" alt="logo" />
//     <p>
//       Edit <code>src/App.tsx</code> and save to reload.
//     </p>
//     <a
//       className="App-link"
//       href="https://reactjs.org"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       Learn React
//     </a>
//   </header>
// </div>
