import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { api } from "../../../config";
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { TituloEBotao } from "../../../components/tituloEbotao";

export const CadastrarPedido = (req) => {

    document.title = "Pedido | Novo Pedido"

    let day = new Date().toLocaleDateString("en-CA", { year: "numeric", month: "2-digit", day: "2-digit" }).replace('/', '-');

    const [status, setStatus] = useState({
        type: "",
        message: ""
    });

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const cliente = 1
    // urlParams.get('cliente')
    const [pedido, setPedido] = useState({
        nome: cliente,
        data: day
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
                console.log('response', response.data);
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
        { ServicoId: '1', quantidade: '1', valor: '1' }
    ]);

    const valorInputItemPedido = (e, index) => {
        const { name, value } = e.target;
        const list = [...listaItemPedido]
        list[index][name] = value;
        setListaItemPedido(list);
    }

    const adicionarItemPedido = () => {
        setListaItemPedido([...listaItemPedido, { ServicoId: '2', quantidade: '2', valor: '2' }]);
    }

    const btnRemoverItem = (index) => {
        const list = [...listaItemPedido];
        list.splice(index, 1);
        setListaItemPedido(list);
    }

    const CadItemPedido = async (id, item) => {
        const headers = {
            'Content-Type': 'application/json'
        }
        console.log(item);
        await axios.post(api + '/itempedido/' + id, item, { headers })
            .then((response) => {
                if (response.data.error) {
                    setStatus({
                        type: 'error',
                        message: response.data.message
                    });
                } else {
                    // document.getElementById(index).style.display = 'none'
                }
                document.getElementById("formulario").reset();
            }).catch(() => {
                alert("ERRO: Conexão com API ou Serviço inserido duas vezes");
                // document.getElementById(index).style.border = '1px solid red';
                console.log("update: Sem conexão com API");
            })
    }

    return (
        <Container>

            <TituloEBotao
                titulo="Novo Pedido"
                btnLink="/listar-pedido"
                btnText="Ver Pedidos"
                btnIcon="VisibilityIcon"
                status={status}
            />

            <Form onSubmit={cadServico} id="formulario">
                <Row>
                    <Col>
                        <FormGroup className="p-2">
                            <Label>
                                Data
                            </Label>
                            <Input type="date" name="data" defaultValue={day} onChange={valorInputPedido} required>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup className="p-2">
                        <Label>
                            ClienteId
                        </Label>
                        <Input type="number" name="nome" defaultValue={cliente} autoFocus onChange={valorInputPedido} required>
                        </Input>
                    </FormGroup>
                    </Col>
                </Row>
                {listaItemPedido.map((item, i) => {
                    return (
                        <div>
                            <FormGroup id={i} key={i} className="p-2">
                                <Row>
                                    <Col lg="3">
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
                                    <Col lg="3">
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
                                    <Col className="d-flex justify-content-left align-items-end">
                                        {listaItemPedido.length !== 1 &&
                                            <Button value="Remover" className="btn btn-sm btn-danger p-1"
                                                onClick={() => btnRemoverItem(i)}>
                                                <DeleteForeverIcon />
                                            </Button>
                                        }
                                    </Col>
                                </Row>
                            </FormGroup>
                        </div>
                    )
                })}
                <div className="d-flex justify-content-between p-2">
                    <Button className="ml-1 d-flex" value="Add"
                        onClick={adicionarItemPedido}>
                        <AddIcon></AddIcon>Adicionar item
                    </Button>
                    <Button type="submit" color="success">
                        Cadastrar
                    </Button>
                </div>
            </Form>
        </Container>
    )
}