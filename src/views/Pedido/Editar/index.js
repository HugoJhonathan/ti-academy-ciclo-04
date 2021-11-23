import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { api } from "../../../config";
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { ModalExclusao } from "../../../components/modalExclusao";
import { TituloEBotao } from "../../../components/tituloEbotao";

export const EditarPedido = (props) => {

    document.title = "Pedido | Editar Pedido"

    let { id } = useParams();

    const [data, setData] = useState([]);


    const [status, setStatus] = useState({
        type: "",
        message: ""
    });

    const [idItem, setIdItem] = useState({
        ServicoId: '',
        PedidoId: '',
        nome: ''
    });

    const [openModal, setOpenModal] = useState(false);

    const [inputList, setInputList] = useState([]);

    const [itensParaAdicionar, setItensParaAdicionar] = useState([]);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList]
        list[index][name] = value;
        setInputList(list)
    }

    const handleChange2 = (e, index) => {
        const { name, value } = e.target;
        const list2 = [...itensParaAdicionar]
        list2[index][name] = value;
        setItensParaAdicionar(list2)
    }

    const handleAddInput = () => {
        setItensParaAdicionar([...itensParaAdicionar, { ServicoId: '', quantidade: '', valor: '' }]);
    }

    const handleRemoveInput = (index) => {
        const list = [...itensParaAdicionar];
        list.splice(index, 1)
        setItensParaAdicionar(list);
        getItensServico();
    }

    const getServico = async () => {
        await axios.get(api + '/pedido/' + id)
            .then((response) => {
                console.log('response', response.data.ped);
                setData(response.data.ped);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a APd.',
                });
            })
    }
    
    const getItensServico = async () => {
        await axios.get(api + '/pedido/' + id + '/servicos/')
            .then((response) => {
                console.log('response', response.data.item);
                setInputList(response.data.item);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a APd.',
                });
            })
    }

    const CadItemPedido = async (id, item, index) => {

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api + '/itempedido/' + id, item, { headers })
            .then((response) => {
                if (response.data.error) {
                    setStatus({
                        type: 'error',
                        message: response.data.message
                    });
                } else {
                    setItensParaAdicionar([]);
                    getServico();
                    getItensServico();
                }
            }).catch(() => {
                alert("ERRO: Conexão com API ou Serviço inserido duas vezes");
            })
    }

    const valorInput = e => setData({
        ...data, [e.target.name]: e.target.value
    });

    const attServico = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.put(api + `/atualizapedido/${id}`, data, { headers })
            .then((response) => {
                if (response.data.error) {
                    setStatus({
                        type: 'error',
                        message: response.data.message
                    });
                } else {
                    inputList.forEach(function (item, index) {
                        attItens(id, item, index);
                    });

                    itensParaAdicionar.forEach(function (item, index) {
                        CadItemPedido(id, item, index);
                    });

                    setStatus({
                        type: 'success',
                        message: response.data.message
                    });
                }
            }).catch(() => {
                console.log("Sem conexão com API");
            })

    }

    const attItens = async (id, item, index) => {

        const headers = {
            'Content-Type': 'application/json'
        }

        console.log('item', item);
        await axios.put(api + `/pedidos/${id}/editaritem`, item, { headers })
            .then((response) => {
                if (response.data.error) {
                    setStatus({
                        type: 'error',
                        message: response.data.message
                    });
                } else {
                    setStatus({
                        type: 'success',
                        message: response.data.message
                    });
                    setItensParaAdicionar([]);
                    getServico();
                    getItensServico();
                }
            }).catch(() => {
                console.log("Sem conexão com API");
            })
    }

    useEffect(() => {
        getItensServico();
        getServico();
    }, [id]);

    return (
        <Container>

            <TituloEBotao
                titulo={"Editar Pedido "+ id}
                btnLink="/listar-pedido"
                btnText="Ver Pedidos"
                btnIcon="VisibilityIcon"
                status={status}
            />

            <Form onSubmit={attServico}>
                <FormGroup className="p-2">
                    <Label>
                        Data
                    </Label>
                    <Input
                        name="data"
                        placeholder="Nome do serviço"
                        type="date"
                        defaultValue={data.data}
                        onChange={valorInput}
                        autoFocus
                        required
                    />
                </FormGroup>

                {inputList.map((item, i) => (
                    <div className="p-2">
                        <Row>
                            <Col xs lg="2">
                                <Label>
                                    ServiçoId
                                </Label>
                                <Input
                                    name="ServicoId"
                                    placeholder="Nome do serviços"
                                    type="number"
                                    value={item.ServicoId}
                                    onChange={e => handleChange(e, i)}
                                    disabled
                                />
                            </Col>
                            <Col xs lg="2">
                                <Label>
                                    Quantidade
                                </Label>
                                <Input
                                    name="quantidade"
                                    placeholder="Nome do serviços"
                                    type="number"
                                    value={item.quantidade}
                                    onChange={e => handleChange(e, i)}
                                    required
                                />
                            </Col>
                            <Col>
                                <Label>
                                    Valor
                                </Label>
                                <Input
                                    name="valor"
                                    placeholder="Nome do serviços"
                                    type="number"
                                    value={item.valor}
                                    onChange={e => handleChange(e, i)}
                                    required
                                />
                            </Col>
                            <Col className="d-flex justify-content-left align-items-end" xs lg="2">
                                <Button onClick={() => { setIdItem({ ServicoId: item.ServicoId, PedidoId: id, nome: item.servicos.nome }); setOpenModal(true) }} className="btn btn-sm btn-danger m-1 p-1">
                                    <DeleteForeverIcon />
                                </Button>
                            </Col>
                        </Row>
                    </div>
                ))}

                {itensParaAdicionar.map((item, i) => (
                    <div className="p-2">
                        <Row>
                            <Col xs lg="2">
                                <Label>
                                    ServiçoId
                                </Label>
                                <Input
                                    name="ServicoId"
                                    placeholder="ID do Serviço"
                                    type="number"
                                    value={item.ServicoId}
                                    onChange={e => handleChange2(e, i)}
                                    required
                                />
                            </Col>
                            <Col xs lg="2">
                                <Label>
                                    Quantidade
                                </Label>
                                <Input
                                    name="quantidade"
                                    placeholder="Qtd."
                                    type="number"
                                    value={item.quantidade}
                                    onChange={e => handleChange2(e, i)}
                                    required
                                />
                            </Col>
                            <Col>
                                <Label>
                                    Valor
                                </Label>
                                <Input
                                    name="valor"
                                    placeholder="Valor"
                                    type="number"
                                    value={item.valor}
                                    onChange={e => handleChange2(e, i)}
                                    required
                                />
                            </Col>
                            <Col className="d-flex justify-content-left align-items-end" xs lg="2">
                                {itensParaAdicionar &&
                                    <Button value="Remover" className="btn btn-sm btn-success secondary p-1 m-1"
                                        onClick={() => handleRemoveInput(i)}>
                                        <DeleteForeverIcon />
                                    </Button>
                                }
                            </Col>
                        </Row>
                    </div>
                ))}

                <div className="d-flex justify-content-between p-2">
                <Button className="ml-1 d-flex" value="Add"
                        onClick={handleAddInput}>
                        <AddIcon></AddIcon>Adicionar item
                    </Button>
                    <Button type="submit" color="success">
                        Atualizar
                    </Button>

                </div>

            </Form>
            {openModal && <ModalExclusao url={'/excluiritempedido/' + id} item={idItem} itemDeletar="ServicoId" atualizar={() => handleRemoveInput()} closeModal={setOpenModal} />}
        </Container>

    )
}