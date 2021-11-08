import axios from "axios";
import { api } from '../../../config/'

import { Container, Table, Alert, Button } from "reactstrap"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { ModalExclusao } from "../../../components/modalExclusao";



export const ListarCliente = () => {
   
    const [dataCliente, setDataCliente] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const [idItem, setIdItem] = useState({
        id: '',
        nome: ''
    });

    const [openModal, setOpenModal] = useState(false);

    const [id, setId] = useState();

    const getCliente = async () => {
        await axios.get(api + '/listaclientes')
            .then((response) => {
                setDataCliente(response.data.clientes);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.',
                });
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
                        <h1>Visualizar Clientes</h1>
                    </div>

                    <div style={{ margin: 'auto 0' }}>
                        <Link to="/cadastrarcliente"
                            className="btn btn-primary btn d-flex align-items-center">
                            <AddIcon />Cadastrar Cliente
                        </Link>
                    </div>

                </div>
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ''}
            </div>
            <div className="p-2">
                {dataCliente.length > 0 ?
                    <>
                        <h4 className="p-2">{dataCliente.length} clientes cadastrados</h4>
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

                                {dataCliente.map(cliente => (
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
                                                <Link to={"/listapedido/" + cliente.id}>
                                                    <Button className="btn btn-sm m-1 btn-success p-1">
                                                        <VisibilityIcon />
                                                    </Button>
                                                </Link>

                                                <Link to={"/atualizacliente/" + cliente.id}>
                                                    <Button className="btn btn-sm m-1 btn-warning p-1">
                                                        <EditIcon />
                                                    </Button>
                                                </Link>

                                                <Button onClick={() => { setId(cliente.id); setIdItem({ id: id, nome: cliente.nome }); setOpenModal(true) }} className="btn btn-sm btn-danger m-1 p-1">
                                                    <DeleteForeverIcon />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </> : ""}
            </div>
            {openModal && <ModalExclusao url={'/excluircliente/' + id} item={idItem} itemDeletar="key" atualizar={() => getCliente()} closeModal={setOpenModal} />}
        </Container>

    )
}