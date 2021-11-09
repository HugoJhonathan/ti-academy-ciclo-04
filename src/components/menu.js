import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap';

const navbarBackground = {
    backgroundColor: "#03989e",
};

export const Menu = (props) => {
    
    const [isOpen, setIsOpen] = useState(true);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <Navbar style={navbarBackground} dark expand="md">
                <Container>
                    <NavbarBrand href="/">TI Academy</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar className="d-flex flex-row-reverse">
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink href="/listar-cliente">Clientes</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/listar-pedido">Pedidos</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/listar-servicos">Serviços</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/listar-produtos">Produtos</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/listar-compras">Compra</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </>
    )
}