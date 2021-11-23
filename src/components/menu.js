import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container, UncontrolledTooltip } from 'reactstrap';

import PeopleAlt from '@material-ui/icons/PeopleAlt';
import Assignment from '@material-ui/icons/Assignment';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Build from '@material-ui/icons/Build';
import BreakfastDining from '@material-ui/icons/Ballot';

const navbarBackground = {
    backgroundColor: "#03989e",
};

export const Menu = (props) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        if (document.querySelector('body').offsetWidth < 767) {
            setIsOpen(!isOpen);
        }
    }

    return (
        <div style={navbarBackground}>
            <Container>
                <Navbar dark expand="md" >
                    <NavbarBrand id="goHome">
                        <Link to="/" className="d-flex align-items-center" style={{ textDecoration: 'none', color: '#fff' }}>
                            <div id="logo" />TI Academy
                        </Link>
                        <UncontrolledTooltip placement="bottom" target="goHome" >Ir para Home</UncontrolledTooltip>
                    </NavbarBrand>

                    <NavbarToggler onClick={toggle} id="navs" />
                    <Collapse navbar isOpen={isOpen} className="collapseMenu">
                        <Nav navbar onClick={toggle} >
                            <NavItem>
                                <Link className="nav-link" to="/listar-cliente"><PeopleAlt /> Clientes</Link>
                            </NavItem>
                            <hr />
                            <NavItem>
                                <Link className="nav-link" to="/listar-pedido"><Assignment />Pedidos</Link>
                            </NavItem>
                            <hr />
                            <NavItem>
                                <Link className="nav-link" to="/listar-servicos"><Build />Serviços</Link>
                            </NavItem>
                            <hr />
                            <NavItem>
                                <Link className="nav-link" to="/listar-produtos"><BreakfastDining />Produtos</Link>
                            </NavItem>
                            <hr />
                            <NavItem>
                                <Link className="nav-link" to="/listar-compras"><ShoppingCart />Compras</Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </Container>
        </div>
    )
}