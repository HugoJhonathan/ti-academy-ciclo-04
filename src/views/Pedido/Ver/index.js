import axios from "axios";
import { api } from '../../../config/'

import { Container, Table, Alert, Button } from "reactstrap"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { ModalExclusao } from "../../../components/modalExclusao";
import EditIcon from '@material-ui/icons/Edit';

export const VerPedido = (props) => {

    const [openModal, setOpenModal] = useState(false);

    let totalPedido = 0;

    const [data, setData] = useState([]);

    const [id, setId] = useState(props.match.params.id);

    const [idItem, setIdItem] = useState({});

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getItens = async () => {
        await axios.get(`${api}/pedido/${id}/servicos`)
            .then((response) => {
                console.log('response:', response.data.item);
                setData(response.data.item);
                setIdItem(response.data.item);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.',
                });
            })
    }

    useEffect(() => {
        getItens();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="p-2">
                    <div className="d-flex">
                        <div className="p-2 m-auto">
                            <h1>Pedido #{id}</h1>
                        </div>

                        <div style={{ margin: 'auto 0' }}>
                            <Link to={"/atualizapedido/" + id}
                                className="btn btn-dark btn d-flex align-items-center">
                                <EditIcon />Editar Pedido
                            </Link>
                        </div>

                    </div>
                    {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ''}
                </div>

                <Table className="mb-0" hover striped bordered>
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th style={{ width: "80px" }}>Qtd.</th>
                            <th>Serviço</th>
                            <th>Descrição</th>
                            <th>Valor</th>

                        </tr>
                    </thead>
                    <tbody>

                        {data.map((item, index) => (
                            totalPedido += Number(item.valor * item.quantidade),

                            <tr key={item.ServicoId}>
                                <td>{item.pedidos.data}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.servicos.nome}</td>
                                <td>{item.servicos.descricao}</td>
                                <td>{item.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>


                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="5">{`TOTAL: ${totalPedido.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`}</td>
                        </tr>
                    </tfoot>
                </Table>
                <Button onClick={() => {setIdItem({ id: id, nome: "Pedido #" + id }); setOpenModal(true) }} className="btn btn-sm btn-danger mt-2 p-1 d-flex align-items-center">
                    <DeleteForeverIcon /> Deletar Pedido
                </Button>
                {openModal && <ModalExclusao url={'/excluirpedido/' + id} item={idItem} itemDeletar="key" atualizar={() => getItens()} closeModal={setOpenModal} />}
            </Container>
        </div>
    )
}