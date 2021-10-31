import axios from "axios";
import { api } from '../../../config/'

import { Container, Table, Alert } from "reactstrap"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ListarServico = () => {
    //   dados obtidos
    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getServicos = async () => {
        await axios.get(api + '/listaservicos')
            .then((response) => {
                console.log(response.data.servicos);
                setData(response.data.servicos);
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
        getServicos();
    }, []);



    return (

        <Container>
            <div className="p-2">
                <div className="d-flex">
                    <div className="p-2 m-auto">
                        <h1>Visualizar informações do serviço</h1>
                    </div>

                    <div style={{ margin: 'auto 0' }}>
                        <Link to="/cadastrarservico"
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
                            <th >ID</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th className="text-center">Ação</th>
                        </tr>
                    </thead>
                    <tbody style={{ borderTop: 'none' }}>

                        {data.map(item => (
                            <tr key={item.id}>
                                <td className="align-middle">{item.id}</td>
                                <td className="align-middle">{item.nome}</td>
                                <td className="align-middle">{item.descricao}</td>
                                <td className="text-center align-middle">
                                    <Link to={"/listar-pedido/" + item.id}
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