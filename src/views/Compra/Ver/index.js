import axios from "axios";
import { api } from '../../../config/'

import { Container, Table, Button } from "reactstrap"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { ModalExclusao } from "../../../components/modalExclusao";
import { TituloEBotao } from "../../../components/tituloEbotao";

export const VerCompra = (props) => {
    
    let { id } = useParams();
    
    document.title = "Compras | Compra #"+id

    const [openModal, setOpenModal] = useState(false);

    let totalPedido = 0;
    const somaTotalPedido = (valor) => {
        totalPedido += Number(valor);
    }

    const [data, setData] = useState({
        clientes: { nome: '' },
    });

    console.log(data.clientes.nome);

    

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
                
                <TituloEBotao
                    titulo={`Pedido #${id} - ${data.clientes.nome}`}
                    btnLink={"/atualizacompra/" + id}
                    btnText="Editar Compra"
                    btnIcon="EditIcon"
                    status={status}
                />

                {data.clientes.nome !== '' ?
                    <>
                        <Table className="mb-0" hover striped bordered responsive>
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
                                            {somaTotalPedido(Number(data.item_compra[index].valor * data.item_compra[index].quantidade))}
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
                {openModal && <ModalExclusao url={'/excluircompra/' + id} item={idItem} itemDeletar="key" atualizar={() => window.location = '/listar-pedido'} closeModal={setOpenModal} />}

            </Container>
        </div>
    )
}