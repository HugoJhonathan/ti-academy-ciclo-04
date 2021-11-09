import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";
import VisibilityIcon from '@material-ui/icons/Visibility';

export const CadastrarProduto = () => {

    const [servico, setServico] = useState({
        nome: "",
        descricao: ""
    });
    const [status, setStatus] = useState({
        type: "",
        message: ""
    });
    const valorInput = e => setServico({
        ...servico, [e.target.name]: e.target.value
    });

    const cadServico = async e => {
        e.preventDefault();
        console.log(servico);

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api + '/produtos', servico, { headers })
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
            });
    }
    return (
        <Container>
            <div className="p-2">
                <div className="d-flex">
                    <div className="p-2 m-auto">
                        <h1>Novo Produto</h1>
                    </div>
                    <div style={{ margin: 'auto 0' }}>
                        <Link to="/listar-produtos"
                            className="btn btn-primary btn d-flex align-items-center">
                            <VisibilityIcon style={{marginRight:"8px"}} />Ver Produtos
                        </Link>
                    </div>
                </div>
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ''}
                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ''}
            </div>
            <Form onSubmit={cadServico}>
                <FormGroup className="p-2">
                    <Label>
                        Nome
                    </Label>
                    <Input
                        name="nome"
                        placeholder="Nome do produto"
                        type="text"
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
                        placeholder="Descrição do produto"
                        type="text"
                        onChange={valorInput}
                        required
                    />
                </FormGroup>
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