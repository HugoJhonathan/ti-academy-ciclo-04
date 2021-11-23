import axios from "axios";
import { useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";
import { TituloEBotao } from "../../../components/tituloEbotao";

export const CadastrarServico = () => {

    document.title = "Serviço | Novo Serviço"

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

        await axios.post(api + '/servicos', servico, { headers })
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
            
            <TituloEBotao
                titulo="Novo Serviço"
                btnLink="/listar-servicos"
                btnText="Ver Serviços"
                btnIcon="VisibilityIcon"
                status={status}
            />

            <Form onSubmit={cadServico}>
                <FormGroup className="p-2">
                    <Label>
                        Nome
                    </Label>
                    <Input
                        name="nome"
                        placeholder="Nome do serviço"
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
                        placeholder="Descrição do serviço"
                        type="text"
                        onChange={valorInput}
                        required
                    />
                </FormGroup>
                <div className="d-flex justify-content-between flex-row-reverse p-2">
                    <Button type="submit" color="success">Cadastrar</Button>
                    <Button type="reset" outline color="danger">Limpar</Button>
                </div>
            </Form>
        </Container>
    )
}