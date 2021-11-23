import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";
import { TituloEBotao } from "../../../components/tituloEbotao";

export const EditarCliente = (props) => {
    document.title = "Cliente | Editar"

    let { id } = useParams();
    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: "",
        message: ""
    });

    const getCliente = async () => {
        await axios.get(api + '/listacliente/' + id)
            .then((response) => {
                console.log(response.data.clientes[0]);
                setData(response.data.clientes[0]);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a APd.',
                });
            })
    }

    const valorInput = e => setData({
        ...data, [e.target.name]: e.target.value
    });

    const attCliente = async e => {
        e.preventDefault();
        const headers = {
            'Content-Type': 'application/json'
        }
        await axios.put(api + `/atualizarcliente/${id}`, data, { headers })
            .then((response) => {
                console.log('data', data);
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
                console.log("Sem conexão com API");
            }).finally(() => {
                window.scrollTo(0, 0);
            })
    }
    
     useEffect(() => {
         getCliente();
     }, [id]);

    return (
        <Container>
           
            <TituloEBotao
                titulo="Editar Cliente"
                btnLink="/listar-cliente"
                btnText="Ver Clientes"
                btnIcon="VisibilityIcon"
                status={status}
            />

            <Form onSubmit={attCliente}>
                <FormGroup className="p-2">
                    <Label>
                        Nome
                    </Label>
                    <Input
                        required
                        name="nome"
                        placeholder="Nome completo"
                        type="text"
                        value={data.nome}
                        onChange={valorInput}
                        autoFocus
                    />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>
                        Endereço
                    </Label>
                    <Input
                        required
                        name="endereco"
                        placeholder="Endereço"
                        type="text"
                        value={data.endereco}
                        onChange={valorInput}
                    />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>
                        Cidade
                    </Label>
                    <Input
                        required
                        name="cidade"
                        placeholder="Cidade"
                        type="text"
                        value={data.cidade}
                        onChange={valorInput}
                    />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>
                        UF
                    </Label>
                    <Input
                        required
                        name="uf"
                        placeholder="Estado / UF"
                        type="text"
                        value={data.uf}
                        onChange={valorInput}
                    />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>
                        Nascimento
                    </Label>
                    <Input
                        required
                        name="nascimento"
                        type="date"
                        value={data.nascimento}
                        onChange={valorInput}
                    />
                </FormGroup>
                <div className="d-flex justify-content-between flex-row-reverse p-2">
                    <Button type="submit" color="success">Atualizar</Button>
                    <Button type="reset" outline color="danger">Limpar</Button>
                </div>
            </Form>
        </Container>
    );
};