import React from 'react'
import { HashRouter, Switch, Route, Link } from 'react-router-dom'
import { HomeRoute } from './HomeRoute'
import { ScreenRoute } from './ScreenRoute'

export class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Switch>
            <Route exact path="/" component={HomeRoute} />
            <Route
              exact
              path="/screens/:userId/:screenId"
              component={ScreenRoute}
            />
            <Route
              render={() => (
                <div>
                  <h1>404</h1>
                  <Link to="/">Go to home...</Link>
                </div>
              )}
            />
          </Switch>
        </div>
      </HashRouter>
    )
  }
}
