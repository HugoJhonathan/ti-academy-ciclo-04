import axios from "axios";
import { api } from '../../../config/'

import { Container, Table, Badge } from "reactstrap"
import { useEffect, useState } from "react";
import { ModalExclusao } from "../../../components/modalExclusao";
import { BotoesDeAcao } from "../../../components/botoesDeAcao";
import { TituloEBotao } from "../../../components/tituloEbotao";

export const ListarCliente = () => {

    document.title = "TIAcademy | Clientes"

    const [dataCliente, setDataCliente] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const [idItem, setIdItem] = useState({
        id: '',
        nome: ''
    });

    const converterData = (dataRecebida) => {
        let data = dataRecebida;
        data = new Date(data);
        let dataFormatada = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
        return dataFormatada
    }

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
            <TituloEBotao
                titulo="Visualizar Clientes"
                btnLink="/cadastrarcliente"
                btnText="Cadastrar Cliente"
                btnIcon="AddIcon"
                status={status}
            />
            <div className="p-2">
                {dataCliente.length > 0 ?
                    <>
                        <Badge color="dark" pill={true} className="m-2 p-2">
                            {dataCliente.length} clientes cadastrados
                        </Badge>
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
                                    <th className="text-center">Ação</th>
                                </tr>
                            </thead>
                            <tbody>

                                {dataCliente.map((cliente, index) => (
                                    <tr key={cliente.id}>
                                        <td>{cliente.id}</td>
                                        <td>{cliente.nome}</td>
                                        <td>{cliente.endereco}</td>
                                        <td>{cliente.cidade}</td>
                                        <td>{cliente.uf}</td>
                                        <td>{converterData(cliente.nascimento)}</td>
                                        <td>{converterData(cliente.clienteDesde)}</td>
                                        <td>
                                            <BotoesDeAcao
                                                id={index}
                                                linkVisualizar={"/listapedido/" + cliente.id}
                                                linkEditar={"/atualizacliente/" + cliente.id}
                                                btnExcluir={() => { setId(cliente.id); setIdItem({ id: id, nome: cliente.nome }); setOpenModal(true) }}
                                            />
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