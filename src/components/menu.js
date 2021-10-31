import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
} from 'reactstrap';

const navbarBackground = {  
    backgroundColor:"#03989e",
  };


export const Menu = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar style={navbarBackground} dark expand="md">
                <Container>
                    <NavbarBrand href="/">TI Acadedmy</NavbarBrand>
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
                        </Nav>
                    </Collapse>
                </Container>

            </Navbar>

        </div>

    );
}