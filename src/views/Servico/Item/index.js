import axios from "axios";
import { api } from '../../../config/'

import { Container, Table, Alert } from "reactstrap"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Item = (props) => {
    console.log(props.match.params.id);
    const [data, setData] = useState([]);

    const [id, setId] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getItens = async () => {
        await axios.get(`${api}/servico/${id}/pedidos`)
            .then((response) => {
                console.log(response.data.item);
                setData(response.data.item);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.',
                });
                // console.log("Erro: sem conexão com a API.")
            })
    }

    useEffect(() => {
        getItens();
    }, [id]);



    return (
        <div>
            <Container>
                <div>
                    <h1>Visualizar informações do serviço</h1>
                </div>
                {status.type === 'error' ? <Alert color="danger">
                    {status.message}
                </Alert> : ''}
                
                <Table striped>
                    <thead>
                        <tr>
                            <th>Pedido Id</th>
                            <th>Servico Id</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Visualizar</th>
                        </tr>
                    </thead>
                    <tbody>

                        {data.map(item => (
                            <tr key={item.ServicoId}>
                                <td>{item.PedidoId}</td>
                                <td>{item.ServicoId}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                                <td className="text-center/">
                                    <Link to={"/listar-pedido/"}
                                    className="btn btn-outline-primary">
                                    Consultar
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}