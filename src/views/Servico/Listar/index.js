import axios from "axios";
import { api } from '../../../config/'

import { Container, Table } from "reactstrap"
import { useEffect, useState } from "react";
import { ModalExclusao } from "../../../components/modalExclusao";
import { BotoesDeAcao } from "../../../components/botoesDeAcao";
import { TituloEBotao } from "../../../components/tituloEbotao";

export const ListarServico = () => {

    document.title = "TIAcademy | Serviços"

    //   dados obtidos
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
            
            <TituloEBotao
                titulo="Visualizar Serviços"
                btnLink="/cadastrarservico"
                btnText="Cadastrar Serviço"
                btnIcon="AddIcon"
                status={status}
            />

            <div className="p-2">
                {data.length > 0 ?
                    <Table hover striped bordered responsive>

                        <thead>
                            <tr>
                                <th >ID</th>
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th className="text-center">Ação</th>
                            </tr>
                        </thead>
                        <tbody style={{ borderTop: 'none' }}>

                            {data.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.nome}</td>
                                    <td>{item.descricao}</td>
                                    <td className="d-flex text-center">
                                        <BotoesDeAcao
                                            id={index}
                                            linkVisualizar={"/listar-pedido/" + item.id}
                                            linkEditar={"/atualizaservico/" + item.id}
                                            btnExcluir={() => { setId(item.id); setIdItem({ id: id, nome: item.nome }); setOpenModal(true) }}
                                        />
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </Table> : ""}
            </div>
            {openModal && <ModalExclusao url={'/excluirservico/' + id} item={idItem} itemDeletar="key" atualizar={() => getServicos()} closeModal={setOpenModal} />}
        </Container>


    )
}