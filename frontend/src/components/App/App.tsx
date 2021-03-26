import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"

import Endpoint from "@markup/helpers/Endpoint"
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
          <Route path={Endpoint.Demo} exact component={Annotate} />
          <Route path={Endpoint.Documentation} exact component={Docs} />
          <Route path={Endpoint.DataGenerator} exact component={DataGenerator} />
          <Route path={Endpoint.Setup} exact component={Setup} />
          <Route path={Endpoint.Annotate} exact component={Annotate} />
          <Route path={Endpoint.Home} exact component={Landing} />
          <Route path={Endpoint.PageNotFound} component={PageNotFound} />
          <Redirect from={Endpoint.Any} to={Endpoint.PageNotFound} />
        </Switch>
      </Router>
    </>
  )
}

export default App
