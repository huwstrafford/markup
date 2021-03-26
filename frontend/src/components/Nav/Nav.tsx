import { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import {
  MDBCollapse,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBNavItem,
  MDBNavLink,
} from 'mdbreact'

import '@markup/components/Nav/Nav.css'
import Endpoint from '@markup/helpers/Endpoint'

class Nav extends Component {
  state = { isOpen: false }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    return (
      <Router>
        <MDBNavbar dark expand="md" className="navbar-custom primary-color">
          <MDBNavbarBrand>
            <MDBNavLink to={Endpoint.Home}>
              <strong className="white-text font-weight-bold">Markup</strong>
            </MDBNavLink>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav right>
              <MDBNavItem className="nav-item-custom">
                <MDBNavLink to={Endpoint.Documentation}>Docs</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem className="nav-item-custom">
                <MDBNavLink to={Endpoint.Repository} target="_blank">GitHub</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem className="nav-item-custom">
                <MDBNavLink to={Endpoint.DataGenerator}>Generator</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem className="nav-item-custom">
                <MDBNavLink to={Endpoint.Annotate}>Annotate</MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </Router>
    )
  }
}

export default Nav
