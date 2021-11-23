import axios from "axios";
import { api } from '../../../config/'

import { Container, Table } from "reactstrap"
import { useEffect, useState } from "react";
import { ModalExclusao } from "../../../components/modalExclusao";
import { BotoesDeAcao } from "../../../components/botoesDeAcao";
import { TituloEBotao } from "../../../components/tituloEbotao";
let x = 0;

export const ListarCompras = () => {
    document.title = "TIAcademy | Compras"
    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const [idItem, setIdItem] = useState({
        id: '',
        nome: ''
    });

    const totalItens = (item_compra) => {
        x = 0;
        item_compra.forEach(function (nome, i) {
            x += nome.valor * nome.quantidade;
        });
        return x.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    }

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
           
            <TituloEBotao
                titulo="Visualizar Compras"
                btnLink="/cadastrarcompra"
                btnText="Nova Compra"
                btnIcon="AddIcon"
                status={status}
            />
            
            <div className="p-2">

                {data.length > 0 ?

                    <Table hover striped bordered responsive>

                        <thead>
                            <tr>
                                <th >Pedido</th>
                                <th>Data</th>
                                <th>Cliente</th>
                                <th>Valor Total</th>
                                <th className="text-center">Ação</th>
                            </tr>
                        </thead>
                        <tbody style={{ borderTop: '0px' }}>

                            {data.map((item, index) => (
                                <tr key={item.id}>
                                    <td>#{item.id}</td>
                                    <td>{item.data}</td>
                                    <td>{item.clientes.nome}</td>
                                    <td>{totalItens(item.item_compra)}</td>
                                    <td className="d-flex text-center">
                                            <BotoesDeAcao
                                                id={index}
                                                linkVisualizar={"/ver-compra/" + item.id}
                                                linkEditar={"/atualizacompra/" + item.id}
                                                btnExcluir={() => { setId(item.id); setIdItem({ id: id, nome: "Compra #" + item.id }); setOpenModal(true) }}
                                            />
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