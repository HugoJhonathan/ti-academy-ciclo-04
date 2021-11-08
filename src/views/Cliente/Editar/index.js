import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";
import VisibilityIcon from '@material-ui/icons/Visibility';

export const EditarCliente = (props) => {
    const [id, setId] = useState(props.match.params.id);
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
            })
    }

    useEffect(() => {
        getCliente();

    }, [id]);

    return (
        <Container>
            <div className="p-2">
                <div className="d-flex">
                    <div className="p-2 m-auto">
                        <h1>Editar Cliente</h1>
                    </div>

                    <div style={{ margin: 'auto 0' }}>
                        <Link to="/listar-cliente"
                            className="btn btn-primary btn d-flex align-items-center">
                            <VisibilityIcon style={{ marginRight: "8px" }} />Ver Clientes
                        </Link>
                    </div>

                </div>
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ''}
                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ''}
            </div>

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
                <div className="d-flex justify-content-between p-2">
                    <Button type="reset" outline color="danger">
                        Resetar
                    </Button>
                    <Button type="submit" color="success">
                        Atualizar
                    </Button>
                </div>
            </Form>
        </Container>
    );
};