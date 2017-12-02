"use strict"
import React from 'react';
import {Nav, NavItem, Navbar, Badge} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class Menu extends React.Component{
  render(){
    return(
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">React-Bootstrap</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/about">
              <NavItem eventKey={2}>about</NavItem>
            </LinkContainer>
            <NavItem eventKey={2} href="/contactus">Contact us</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="/admin">Admin</NavItem>
            <NavItem eventKey={2} href="/cart">Your cart
              { (this.props.cartItemsNumber > 0)?(
                  <Badge className="badge">{this.props.cartItemsNumber}</Badge>)
                  :('')
              }
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default Menu
