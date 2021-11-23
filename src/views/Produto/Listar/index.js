import axios from "axios";
import { api } from '../../../config/'

import { Container, Table } from "reactstrap"
import { useEffect, useState } from "react";
import { ModalExclusao } from "../../../components/modalExclusao";
import { BotoesDeAcao } from "../../../components/botoesDeAcao";
import { TituloEBotao } from "../../../components/tituloEbotao";

export const ListarProduto = () => {

    document.title = "TIAcademy | Produtos"

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
        await axios.get(api + '/listaprodutos')
            .then((response) => {
                console.log(response.data.produto);
                setData(response.data.produto);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.',
                });
            })
    }

    useEffect(() => {
        getServicos();
    }, []);

    return (

        <Container>

            <TituloEBotao
                titulo="Visualizar Produtos"
                btnLink="/cadastrarproduto"
                btnText="Cadastrar Produto"
                btnIcon="AddIcon"
                status={status}
            />

            <div className="p-2">
                {data.length > 0 ?
                    <Table hover striped bordered responsive>

                        <thead>
                            <tr>
                                <th>ID</th>
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
                                            linkVisualizar={"/listar-produto/" + item.id}
                                            linkEditar={"/atualizaproduto/" + item.id}
                                            btnExcluir={() => { setId(item.id); setIdItem({ id: id, nome: item.nome }); setOpenModal(true) }}
                                        />
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </Table> : ""}
            </div>
            {openModal && <ModalExclusao url={'/excluirproduto/' + id} item={idItem} itemDeletar="key" atualizar={() => getServicos()} closeModal={setOpenModal} />}
        </Container>
    )
}