import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"

import Endpoint from "@markup/helpers/Endpoint"
import Nav from "@markup/components/Nav/Nav"
import Home from "@markup/components/Home/Home"
import Docs from "@markup/components/Docs/Docs"
import DataGenerator from "@markup/components/Tools/DataGenerator/DataGenerator"
import SetupForm from "@markup/components/Setup/SetupForm"
import Annotate from "@markup/components/Annotate/Annotate"
import PageNotFound from "@markup/components/Failure/PageNotFound/PageNotFound"
import ConfigCreator from "@markup/components/Tools/ConfigCreator/ConfigCreator"
import "./App.css"

function App(): JSX.Element {
  return (
    <Router>
      <Nav/>
      <Switch>
        <Route exact path={Endpoint.Demo} component={Annotate} />
        <Route exact path={Endpoint.Documentation} component={Docs} />
        <Route exact path={Endpoint.DataGenerator} component={DataGenerator} />
        <Route exact path={Endpoint.ConfigCreator} component={ConfigCreator} />
        <Route exact path={Endpoint.SetupForm} component={SetupForm} />
        <Route exact path={Endpoint.Annotate} component={Annotate} />
        <Route exact path={Endpoint.Home} component={Home} />
        <Route path={Endpoint.PageNotFound} component={PageNotFound} />
        <Redirect from={Endpoint.Any} to={Endpoint.PageNotFound} />
      </Switch>
    </Router>
  )
}

export default App
