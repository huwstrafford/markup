import { useState } from 'react'
import {
  MDBCollapse,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBNavItem,
  MDBNavLink,
} from 'mdbreact'

import Endpoint from '@markup/helpers/Endpoint'
import './Nav.css'

function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleCollapse = () => {
    setIsOpen(!isOpen)
  }

    return (
      <MDBNavbar dark expand="md" className="navbar-custom primary-color">
        <MDBNavbarBrand>
          <MDBNavLink to={Endpoint.Home}>
            <strong className="white-text font-weight-bold custom-navbar-logo">markup</strong>
          </MDBNavLink>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav right>
            <MDBNavItem className="nav-item-custom">
              <MDBNavLink to={Endpoint.Documentation}>Docs</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem className="nav-item-custom">
              <a href={Endpoint.Repository} target="_blank" rel="noreferrer" className="nav-link Ripple-parent">GitHub</a>
            </MDBNavItem>
            <MDBNavItem className="nav-item-custom">
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <span className="mr-2">Tools</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem href={Endpoint.DataGenerator}>Data Generator</MDBDropdownItem>
                  <MDBDropdownItem href={Endpoint.ConfigCreator}>Config Creator</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
            <MDBNavItem className="nav-item-custom">
              <MDBNavLink to={Endpoint.SetupForm}>Annotate</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    )
}

export default Nav
