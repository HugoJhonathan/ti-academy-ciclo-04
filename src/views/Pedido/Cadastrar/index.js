import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { api } from "../../../config";
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export const CadastrarPedido = () => {

    const [pedido, setPedido] = useState({
        data: "",
        nome: ""
    });

    const [status, setStatus] = useState({
        type: "",
        message: ""
    });

    const valorInputPedido = e => setPedido({
        ...pedido, [e.target.name]: e.target.value
    });

    const cadServico = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        }
        await axios.post(api + '/cliente/' + pedido.nome + '/pedido', pedido, { headers })
            .then((response) => {
                console.log('console', response.data);
                if (response.data.error) {
                    setStatus({
                        type: 'error',
                        message: response.data.message
                    });
                } else {
                    setStatus({
                        type: 'success',
                        message: 'Pedido criado com sucesso!'
                    });
                    listaItemPedido.forEach(function (item, index) {
                        CadItemPedido(response.data.order.id, item, index);
                    });
                }
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Sem conexão com API'
                });
            });
    }



    const [listaItemPedido, setListaItemPedido] = useState([
        { ServicoId: '', quantidade: '', valor: '' }
    ]);

    const valorInputItemPedido = (e, index) => {
        const { name, value } = e.target;
        const list = [...listaItemPedido]
        list[index][name] = value;
        setListaItemPedido(list);
    }

    const adicionarItemPedido = () => {
        setListaItemPedido([...listaItemPedido, { ServicoId: '', quantidade: '', valor: '' }]);
    }

    const btnRemoverItem = (index) => {
        const list = [...listaItemPedido];
        list.splice(index, 1);
        setListaItemPedido(list);
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
                    document.getElementById(index).style.display = 'none'
                }
            }).catch(() => {
                alert("ERRO: Conexão com API ou Serviço inserido duas vezes");
                document.getElementById(index).style.border = '1px solid red';
                console.log("update: Sem conexão com API");
            })
    }

    return (
        <Container>
            <div className="p-2">
                <div className="d-flex">
                    <div className="p-2 m-auto">
                        <h1>Novo Pedido</h1>
                    </div>
                    <div style={{ margin: 'auto 0' }}>
                        <Link to="/listar-pedido"
                            className="btn btn-primary btn d-flex align-items-center">
                            <VisibilityIcon style={{ marginRight: "8px" }} />Ver Pedidos
                        </Link>
                    </div>
                </div>
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ''}
                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ''}
            </div>

            <Form onSubmit={cadServico} id="formulario">
                <FormGroup className="p-2">
                    <Label>
                        Data
                    </Label>
                    <Input type="date" name="data" onChange={valorInputPedido} autoFocus required>

                    </Input>
                    <Label>
                        ClienteId
                    </Label>
                    <Input type="number" name="nome" onChange={valorInputPedido} required>
                    </Input>
                </FormGroup>
                {listaItemPedido.map((item, i) => {
                    return (
                        <div>
                            <FormGroup id={i} key={i} className="p-2">
                                <Row>
                                    <Col xs lg="2">
                                        <Label>
                                            ServiçoId
                                        </Label>
                                        <Input
                                            required
                                            name="ServicoId"
                                            placeholder="Nome do serviços"
                                            type="number"
                                            value={item.ServicoId}
                                            onChange={e => valorInputItemPedido(e, i)}
                                        />
                                    </Col>
                                    <Col xs lg="2">
                                        <Label>
                                            Quantidade
                                        </Label>
                                        <Input
                                            required
                                            name="quantidade"
                                            placeholder="Nome do serviços"
                                            type="number"
                                            value={item.quantidade}
                                            onChange={e => valorInputItemPedido(e, i)}
                                        />
                                    </Col>
                                    <Col>
                                        <Label>
                                            Valor
                                        </Label>
                                        <Input
                                            required
                                            name="valor"
                                            placeholder="Nome do serviços"
                                            type="number"
                                            value={item.valor}
                                            onChange={e => valorInputItemPedido(e, i)}
                                        />
                                    </Col>
                                    <Col className="d-flex justify-content-left align-items-end" xs lg="2">
                                        {listaItemPedido.length !== 1 &&
                                            <Button value="Remover" className="btn btn-sm btn-danger p-1"
                                                onClick={() => btnRemoverItem(i)}>
                                                <DeleteForeverIcon />
                                            </Button>
                                        }
                                    </Col>
                                    {listaItemPedido.length - 1 === i &&
                                        <div className="mt-2">
                                            <Button className="ml-1 d-flex" value="Add"
                                                onClick={adicionarItemPedido}>
                                                <AddIcon></AddIcon>Adicionar item
                                            </Button>
                                        </div>
                                    }
                                </Row>
                            </FormGroup>
                        </div>
                    )
                })}
                <div className="d-flex justify-content-between p-2">
                    <Button type="reset" outline color="danger">
                        Limpar
                    </Button>
                    <Button type="submit" color="success">
                        Cadastrar
                    </Button>
                </div>
            </Form>
        </Container>
    )
}