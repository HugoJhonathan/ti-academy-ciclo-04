import axios from "axios";
import { api } from '../../../config/'

import { Container, Table, Alert, Button } from "reactstrap"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { ModalExclusao } from "../../../components/modalExclusao";
import EditIcon from '@material-ui/icons/Edit';

export const VerCompra = (props) => {

    const [openModal, setOpenModal] = useState(false);

    let totalPedido = 0;

    const [data, setData] = useState({
        clientes: {nome: ''},
    });
    
    console.log(data.clientes.nome);
    
    const [id, setId] = useState(props.match.params.id);

    const [idItem, setIdItem] = useState({});

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getItens = async () => {
        await axios.get(`${api}/compra/${id}`)
            .then((response) => {
                
                setData(response.data.ped);

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
                            <h1>Compra #{id}</h1>
                            <h3>{data.clientes.nome}</h3>
                        </div>

                        <div style={{ margin: 'auto 0' }}>
                            <Link to={"/atualizacompra/" + id}
                                className="btn btn-dark btn d-flex align-items-center">
                                <EditIcon />Editar Compra
                            </Link>
                        </div>

                    </div>
                    {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ''}
                </div>
                {data.clientes.nome !== '' ?
                    <>
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
                                {
                                    data.item_compra.map((item, index) => (
                                        totalPedido += Number(data.item_compra[index].valor * data.item_compra[index].quantidade),
                                        <tr key={data.produtos_comp[index].ServicoId}>
                                            <td>{data.data}</td>
                                            <td>{data.item_compra[index].quantidade}</td>
                                            <td>{data.item_compra[index].nome}</td>
                                            <td>{data.item_compra[index].descricao}</td>
                                            <td>
                                                {data.item_compra[index].valor.toLocaleString('pt-br',
                                                    { style: 'currency', currency: 'BRL' })
                                                }
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="5">{`TOTAL: ${totalPedido.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`}</td>
                                </tr>
                            </tfoot>
                        </Table>

                        <Button onClick={() => { setIdItem({ id: id, nome: "Compra #" + id }); setOpenModal(true) }} className="btn btn-sm btn-danger mt-2 p-1 d-flex align-items-center">
                            <DeleteForeverIcon /> Deletar Compra
                        </Button>
                    </>
                    : ''}
                {openModal && <ModalExclusao url={'/excluircompra/' + id} item={idItem} itemDeletar="key" atualizar={() => getItens()} closeModal={setOpenModal} />}

            </Container>
        </div>
    )
}