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
let x = 0;

export const ListarCompras = () => {

    const [data, setData] = useState([]);

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

    const getPedidos = async () => {
        await axios.get(api + '/listacompras')
            .then((response) => {
                setData(response.data.clientes);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.',
                });
            });
    }

    useEffect(() => {
        getPedidos();
    }, []);

    return (

        <Container>
            <div className="p-2">
                <div className="d-flex">
                    <div className="p-2 m-auto">
                        <h1>Visualizar Compras</h1>
                    </div>

                    <div style={{ margin: 'auto 0' }}>
                        <Link to="/cadastrarcompra"
                            className="btn btn-primary btn d-flex align-items-center">
                            <AddIcon />Novo Compra
                        </Link>
                    </div>

                </div>
                {status.type === 'error' ? <Alert color="danger">
                    {status.message}
                </Alert> : ''}
            </div>
            <div className="p-2">

                {data.length > 0 ?

                    <Table hover striped bordered>

                        <thead>
                            <tr>
                                <th >Pedido</th>
                                <th>Data</th>
                                <th>Cliente</th>
                                <th>Valor Total</th>
                                <th className="text-center" style={{ width: '120px' }}>Ação</th>
                            </tr>
                        </thead>
                        <tbody style={{ borderTop: '0px' }}>

                            {data.map((item, index) => (
                                <tr key={item.id}>
                                    <td>#{item.id}</td>
                                    <td>{item.data}</td>
                                    <td>{item.clientes.nome}</td>
                                    <td>
                                        {
                                            x = 0,
                                            item.item_compra.forEach(function (nome, i) {
                                                x += nome.valor * nome.quantidade;
                                            }),
                                            x.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                                        }
                                    </td>
                                    <td className="d-flex text-center">
                                        <div className="d-flex text-center align-middle">
                                            <Link to={"/ver-compra/" + item.id}>
                                                <Button className="btn btn-sm m-1 btn-success p-1">
                                                    <VisibilityIcon />
                                                </Button>
                                            </Link>

                                            <Link to={"/atualizacompra/" + item.id}>
                                                <Button className="btn btn-sm m-1 btn-warning p-1">
                                                    <EditIcon />
                                                </Button>
                                            </Link>

                                            <Button onClick={() => { setId(item.id); setIdItem({ id: id, nome: "Compra #" + item.id }); setOpenModal(true) }} className="btn btn-sm btn-danger m-1 p-1">
                                                <DeleteForeverIcon />
                                            </Button>

                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table> : ""}
            </div>
            {openModal && <ModalExclusao url={'/excluircompra/' + id} item={idItem} itemDeletar="key" atualizar={() => getPedidos()} closeModal={setOpenModal} />}

        </Container>

    )
}