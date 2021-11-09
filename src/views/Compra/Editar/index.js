import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { api } from "../../../config";
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { ModalExclusao } from "../../../components/modalExclusao";

export const EditarCompra = (props) => {
    const [id, setId] = useState(props.match.params.id);

    const [data, setData] = useState({
        data:""
    });

    const [status, setStatus] = useState({
        type: "",
        message: ""
    });

    const [idItem, setIdItem] = useState({
        ProdutoId: '',
        CompraId: '',
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
        setItensParaAdicionar([...itensParaAdicionar, { ProdutoId: '', quantidade: '', valor: '' }]);
    }

    const handleRemoveInput = (index) => {
        const list = [...itensParaAdicionar];
        list.splice(index, 1)
        setItensParaAdicionar(list);
        getItensServico();
    }

    const getServico = async () => {
        await axios.get(api + '/compra/' + id)
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
        await axios.get(api + '/compra/' + id + '/produtos/')
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

        await axios.post(api + '/itemcompra/' + id, item, { headers })
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

        await axios.put(api + `/atualizacompra/${id}`, data, { headers })
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
        await axios.put(api + `/compras/${id}/editaritem`, item, { headers })
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
        getServico();
        getItensServico();

    }, [id]);

    return (
        <Container>
            <div className="p-2">
                <div className="d-flex">
                    <div className="p-2 m-auto">
                        <h1>Editar Compra #{id} </h1>
                    </div>

                    <div style={{ margin: 'auto 0' }}>
                        <Link to="/listar-compras"
                            className="btn btn-primary btn d-flex align-items-center">
                            <VisibilityIcon style={{ marginRight: "8px" }} />Ver Compras
                        </Link>
                    </div>

                </div>
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ''}
                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ''}
            </div>

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
                                    name="ProdutoId"
                                    placeholder="Nome do serviços"
                                    type="number"
                                    value={item.ProdutoId}
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
                                <Button onClick={() => { setIdItem({ ProdutoId: item.ProdutoId, CompraId: id, nome:''}); setOpenModal(true) }} className="btn btn-sm btn-danger m-1 p-1">
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
                                    name="ProdutoId"
                                    placeholder="ID do Serviço"
                                    type="number"
                                    value={item.ProdutoId}
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
                                {inputList.length !== 1 &&
                                    <Button value="Remover" className="btn btn-sm btn-success p-1"
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
            {openModal && <ModalExclusao url={'/excluiritemcompra/' + id} item={idItem} itemDeletar="ProdutoId" atualizar={() => handleRemoveInput()} closeModal={setOpenModal} />}
        </Container>

    )
}