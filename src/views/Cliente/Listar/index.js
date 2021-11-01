import axios from "axios";
import { api } from '../../../config/'

import { Container, Table, Alert, Button, Badge } from "reactstrap"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

let total_clientes = 0;

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
                total_clientes = response.data.clientes.length;
                console.log(response.data.clientes.length);
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
                            className="btn btn-primary btn d-flex align-items-center">
                            <AddIcon />Cadastrar Cliente
                        </Link>
                    </div>

                </div>
                {status.type === 'error' ? <Alert color="danger">
                    {status.message}
                </Alert> : ''}
            </div>
            <div className="p-2">



                <Table hover responsive striped bordered>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Endereço</th>
                            <th>Cidade</th>
                            <th>UF</th>
                            <th>Nascimento</th>
                            <th>Cliente desde</th>
                            <th className="text-center" style={{ width: '120px' }}>Ação</th>
                        </tr>
                    </thead>
                    <tbody>

                        {data.map(cliente => (
                            <tr key={cliente.id}>
                                <td>{cliente.id}</td>
                                <td>{cliente.nome}</td>
                                <td>{cliente.endereco}</td>
                                <td>{cliente.cidade}</td>
                                <td>{cliente.uf}</td>
                                <td>{cliente.nascimento}</td>

                                <td>{cliente.clienteDesde}</td>
                                <td>
                                    <div className="d-flex text-center align-middle">
                                        <TooltipItem
                                            id={1}
                                            item={{
                                                placement: 'bottom',
                                                text: 'Bottom'
                                            }}
                                        />
                                        <Link to={"/listapedido/" + cliente.id}>
                                            <Button className="btn btn-sm m-1 btn-success p-1">
                                                <VisibilityIcon />
                                            </Button>
                                        </Link>

                                        <Link to={"/listapedido/" + cliente.id}>
                                            <Button className="btn btn-sm m-1 btn-warning p-1">
                                                <EditIcon />
                                            </Button>
                                        </Link>

                                        <Link to={"/listapedido/" + cliente.id}>
                                            <Button className="btn btn-sm btn-danger m-1 p-1">
                                                <DeleteForeverIcon />
                                            </Button>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

        </Container>

    )
}