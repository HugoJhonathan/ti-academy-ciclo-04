import axios from "axios";
import { api } from '../../../config/'

import { Container, Table, Alert } from "reactstrap"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ListarCliente = () => {
    //   dados obtidos
    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getCliente = async () => {
        await axios.get(api + '/listaclientes')
            .then((response) => {
                console.log(response.data.clientes);
                setData(response.data.clientes);
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
        getCliente();
    }, []);



    return (

        <Container>
            <div className="p-2">
                <div className="d-flex">
                    <div className="p-2 m-auto">
                        <h1>Visualizar clientes</h1>
                    </div>

                    <div style={{ margin: 'auto 0' }}>
                        <Link to="/cadastrarcliente"
                            className="btn btn-outline-primary btn-sm">
                            Cadastrar
                        </Link>
                    </div>

                </div>
                {status.type === 'error' ? <Alert color="danger">
                    {status.message}
                </Alert> : ''}
            </div>
            <div className="p-2">
                <Table hover striped bordered>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Endereço</th>
                            <th>Cidade</th>
                            <th>UF</th>
                            <th>Nascimento</th>
                            <th>Cliente desde</th>
                            <th className="text-center">Ação</th>
                        </tr>
                    </thead>
                    <tbody style={{ borderTop: 'none' }}>

                        {data.map(cliente => (
                            <tr key={cliente.id}>
                                <td>{cliente.id}</td>
                                <td>{cliente.nome}</td>
                                <td>{cliente.endereco}</td>
                                <td>{cliente.cidade}</td>
                                <td>{cliente.uf}</td>
                                <td>{cliente.nascimento}</td>

                                <td>{cliente.clienteDesde}</td>
                                <td className="text-center align-middle">
                                    <Link to={"/listar-pedido/" + cliente.id}
                                        className="btn btn-outline-primary">
                                        Consultar
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

        </Container>

    )
}