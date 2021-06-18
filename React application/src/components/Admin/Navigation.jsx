import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';

const Navigation = () => {


    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Nav.Link as={Link} to="/admin/home">
                        AdminHome
                    </Nav.Link>
                    <Nav.Link as={Link} to="/admin/category">
                        Categories
                    </Nav.Link>
                    <Nav.Link as={Link} to="/admin/product">
                        Products
                    </Nav.Link>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );

};

export default Navigation;
