import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import Nav from "../Nav/Nav"
import Footer from "../Footer/Footer"
import Landing from "../Landing/Landing"

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/docs">
            <About/>
          </Route>
          <Route path="/generator">
            <Users/>
          </Route>
          <Route path="/annotate">
            <Home/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App

function Home() {
  return (
    <>
      <Nav/>
      <Landing/>
      <Footer/>
    </>
  )
}

function About() {
  return <h2>About</h2>
}

function Users() {
  return <h2>Users</h2>
}
