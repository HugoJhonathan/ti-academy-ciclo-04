import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";
import VisibilityIcon from '@material-ui/icons/Visibility';

export const EditarServico = (props) => {

    const [id, setId] = useState(props.match.params.id);

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: "",
        message: ""
    });

    const getServico = async () => {
        await axios.get(api + '/listaservicos/' + id)
            .then((response) => {
                console.log(response.data.serv);
                setData(response.data.serv);
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

    const attServico = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.put(api + `/atualizaservico/${id}`, data, { headers })
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
                console.log("Sem conexão com API");
            })
    }

    useEffect(() => {
        getServico();

    }, [id]);

    return (
        <Container>
            <div className="p-2">
                <div className="d-flex">
                    <div className="p-2 m-auto">
                        <h1>Editar Serviço</h1>
                    </div>
                    <div style={{ margin: 'auto 0' }}>
                        <Link to="/listar-servicos"
                            className="btn btn-primary btn d-flex align-items-center">
                            <VisibilityIcon style={{marginRight:"8px"}} />Ver Serviços
                        </Link>
                    </div>
                </div>
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ''}
                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ''}
            </div>

            <Form onSubmit={attServico}>
                <FormGroup className="p-2">
                    <Label>
                        Nome
                    </Label>
                    <Input
                        name="nome"
                        placeholder="Nome do serviço"
                        type="text"
                        defaultValue={data.nome}
                        onChange={valorInput}
                        autoFocus
                        required
                    />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>
                        Descrição
                    </Label>
                    <Input
                        name="descricao"
                        placeholder="Descrição do serviço"
                        type="text"
                        defaultValue={data.descricao}
                        onChange={valorInput}
                        required
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
    )
}