import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row, Spinner } from "reactstrap";
import { TituloEBotao } from "../../../components/tituloEbotao";
import { api } from "../../../config";

export const CadastrarCliente = () => {
    document.title = "Cliente | Cadastro"

    let day = new Date().toLocaleDateString("en-CA", { year: "numeric", month: "2-digit", day: "2-digit" }).replace('/', '-');

    const [cliente, setCliente] = useState({
        nome: "",
        descricao: "",
        clienteDesde: day
    });

    const [status, setStatus] = useState({
        type: "",
        message: ""
    })

    const valorInput = e => setCliente({
        ...cliente, [e.target.name]: e.target.value
    });

    const funcCep = () => {
        const CepInput = document.querySelector("#cep");
        CepInput.value = CepInput.value.replace(/\D+/g, '');
        CepInput.value = CepInput.value.replace(/^(\d{5})(\d{3}).*/, "$1-$2");
        console.log(CepInput.value.length);
        if (CepInput.value.length === 9) {
            pesquisaCep(CepInput.value);
        }
    }

    const formulario = document.querySelector('#form-endedeco');

    let pesquisaCep = async function (cep) {
        document.querySelector('#loading').style.display = 'flex';

        let url = `https://viacep.com.br/ws/${cep}/json/`;

        try {
            let dadosFetch = await fetch(url); // response
            let dadosJson = await dadosFetch.json(); // json do dadosFetch
            if (dadosJson.erro) {
                formulario.reset();
                formulario.cep.focus();
                throw new Error("CEP não localizado! Tente novamente");
            }
            if (dadosJson) {
                setTimeout(function () {
                    document.querySelector('#loading').style.display = 'none';
                    resultadoCep(dadosJson); // envia o json para outra função
                }, 300);
            }
        } catch (error) { // se der erro
            setTimeout(function () {
                document.querySelector('#loading').style.display = 'none';
            }, 300);
            setStatus({
                type: 'error',
                message: 'CEP não localizado! Tente novamente.'
            });
            window.scrollTo(0, 0);
        }
    }

    function resultadoCep(pesquisaCep) {
        let logradouro;
        let clientee;
        for (let campo in pesquisaCep) {
            if (campo === 'logradouro') {
                logradouro = pesquisaCep[campo];
            }
            if (campo === 'bairro') {
                document.querySelector("#endereco").value = logradouro + ' - ' + pesquisaCep[campo];
                clientee = {
                    ...cliente, endereco: logradouro + ' - ' + pesquisaCep[campo]
                }
            }
            if (campo === 'localidade') {
                document.querySelector("#cidade").value = pesquisaCep[campo];
                clientee = {
                    ...clientee, cidade: pesquisaCep[campo]
                }
            }
            if (campo === 'uf') {
                document.querySelector("#uf").value = pesquisaCep[campo];
                clientee = {
                    ...clientee, uf: pesquisaCep[campo]
                }
                document.querySelector("#clienteDesde").focus();
                setStatus({ // zera o status de erros caso na primeira vez tenha iserido cep errado, agora faz remover o Alert
                    type: '',
                    message: ''
                });
            }
            setCliente(clientee);
        }
    }
 

    const cadCliente = async e => {
        e.preventDefault();
        console.log(cliente);

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api + '/cliente', cliente, { headers })
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
                }
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Sem conexão com API'
                });
                console.log("Sem conexão com API");
            }).finally(() => {
                window.scrollTo(0, 0);
            })
    }

    return (
        <Container>
            <div id="loading">
                <Spinner type="grow">
                    Loading...
                </Spinner>
            </div>
            <TituloEBotao
                titulo="Cadastrar Cliente"
                btnLink="/listar-cliente"
                btnText="Ver Clientes"
                btnIcon="VisibilityIcon"
                status={status}
            />
            <Form onSubmit={cadCliente}>
                <Row>
                    <Col>
                        <FormGroup className="p-2">
                            <Label>
                                Nome
                            </Label>
                            <Input
                                required
                                name="nome"
                                placeholder="Nome completo do cliente"
                                type="text"
                                onChange={valorInput}
                                autoFocus
                            />
                        </FormGroup>
                    </Col>
                    <Col lg="3">
                        <FormGroup className="p-2">
                            <Label>
                                Data de nascimento
                            </Label>
                            <Input
                                required
                                name="nascimento"

                                type="date"
                                onChange={valorInput}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col lg="3">

                        <FormGroup className="p-2">
                            <Label>
                                CEP
                            </Label>
                            <Input
                                name="cep"
                                id="cep"
                                onKeyUp={funcCep}
                                placeholder="00000-000"
                                type="text"
                                onChange={valorInput}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup className="p-2">
                            <Label>
                                Endereço
                            </Label>
                            <Input
                                required
                                name="endereco"
                                id="endereco"
                                placeholder="Rua, Número e bairro"
                                type="text"
                                onChange={valorInput}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs lg="2">
                        <FormGroup className="p-2">
                            <Label>
                                Cidade
                            </Label>
                            <Input
                                required
                                name="cidade"
                                placeholder="Cidade"
                                type="text"
                                id="cidade"
                                onChange={valorInput}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs lg="1">
                        <FormGroup className="p-2">
                            <Label>
                                UF
                            </Label>
                            <Input
                                required
                                name="uf"
                                id="uf"
                                placeholder="Estado"
                                type="text"
                                onChange={valorInput}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col lg="3">
                        <FormGroup className="p-2">
                            <Label>
                                Cliente Desde
                            </Label>
                            <Input
                                required
                                name="clienteDesde"
                                placeholder=""
                                id="clienteDesde"
                                defaultValue={day}
                                type="date"
                                onChange={valorInput}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <div className="d-flex justify-content-between flex-row-reverse p-2">
                    <Button type="submit" color="success">Cadastrar</Button>
                    <Button type="reset" outline color="danger">Limpar</Button>
                </div>

            </Form>

        </Container>

    );
};