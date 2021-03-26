import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"

import Endpoint from "@markup/helpers/endpoint"
import Nav from "@markup/components/Nav/Nav"
import Landing from "@markup/components/Landing/Landing"
import Docs from "@markup/components/Docs/Docs"
import DataGenerator from "@markup/components/DataGenerator/DataGenerator"
import Setup from "@markup/components/Setup/Setup"
import Annotate from "@markup/components/Annotate/Annotate"
import PageNotFound from "@markup/components/Failure/PageNotFound/PageNotFound"

function App() {
  return (
    <>
      <Nav/>

      <Router>
        <Switch>
          <Route path={Endpoint.Documentation} exact={true} component={Docs} />
          <Route path={Endpoint.DataGenerator} exact={true} component={DataGenerator} />
          <Route path={Endpoint.Setup} exact={true} component={Setup} />
          <Route path={Endpoint.Annotate} exact={true} component={Annotate} />
          <Route path={Endpoint.Home} exact={true} component={Landing} />
          <Route path={Endpoint.PageNotFound} component={PageNotFound} />
          <Redirect from={Endpoint.Any} to={Endpoint.PageNotFound} />
        </Switch>
      </Router>
    </>
  )
}

export default App
