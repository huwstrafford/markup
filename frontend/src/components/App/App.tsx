import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import Nav from "../Nav/Nav"
import Footer from "../Footer/Footer"
import Landing from "../Landing/Landing"
import Docs from "../Docs/Docs"
import Generator from "../Generator/Generator"
import Annotate from "../Annotate/Annotate"

function App() {
  return (
    <>
      <Nav/>

      <Router>
        <Switch>
          <Route path="/docs">
            <Docs/>
          </Route>
          <Route path="/generator">
            <Generator/>
          </Route>
          <Route path="/annotate">
            <Annotate/>
          </Route>
          <Route path="/">
            <Landing/>
          </Route>
        </Switch>
      </Router>

      <Footer/>
    </>
  )
}

export default App
