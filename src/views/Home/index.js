import { Container } from "reactstrap"

import {CadastrarPedido} from '../Pedido/Cadastrar'

export const Home = () => {
    document.title = "TIAcademy Services | Home"
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2 div1" >
                        <div className="div2"><h1>Home</h1></div>
                        <div className="div3"><span>asdasd</span></div>
                        <CadastrarPedido></CadastrarPedido>

                    </div>
                </div>
            </Container>
        </div>
    )
}