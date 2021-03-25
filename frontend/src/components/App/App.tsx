import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import Nav from "@markup/components/Nav/Nav"
import Footer from "@markup/components/Footer/Footer"
import Landing from "@markup/components/Landing/Landing"
import Docs from "@markup/components/Docs/Docs"
import Generator from "@markup/components/Generator/Generator"
import Annotate from "@markup/components/Annotate/Annotate"
import Endpoint from "@markup/helpers/endpoint"

function App() {
  return (
    <>
      <Nav/>

      <Router>
        <Switch>
          <Route path={Endpoint.Documentation}>
            <Docs/>
          </Route>
          <Route path={Endpoint.DataGenerator}>
            <Generator/>
          </Route>
          <Route path={Endpoint.Annotate}>
            <Annotate/>
          </Route>
          <Route path={Endpoint.Home}>
            <Landing/>
          </Route>
        </Switch>
      </Router>

      <Footer/>
    </>
  )
}

export default App
