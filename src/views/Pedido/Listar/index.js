import axios from "axios";
import { api } from '../../../config/'

import { Container, Table, Alert } from "reactstrap"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ListaPedido = (props) => {
    console.log(props.match.params.id);
    const [data, setData] = useState([]);

    const [id, setId] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getItens = async () => {
        await axios.get(`${api}/listapedido/${id}`)
            .then((response) => {
                console.log(response.data.ped);
                setData(response.data.ped);
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
                            <th>Pedido</th>
                            <th>Data</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>

                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.data}</td>
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