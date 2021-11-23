import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";
import { TituloEBotao } from "../../../components/tituloEbotao";

export const EditarServico = (props) => {

    document.title = "Serviço | Editar Serviço"

    let { id } = useParams();

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
            
            <TituloEBotao
                titulo="Editar Serviço"
                btnLink="/listar-servicos"
                btnText="Ver Serviços"
                btnIcon="VisibilityIcon"
                status={status}
            />

            <Form onSubmit={attServico}>
                <FormGroup className="p-2">
                    <Label>
                        Nome
                    </Label>
                    <Input
                        name="nome"
                        placeholder="Nome do serviço"
                        type="text"
                        value={data.nome}
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
                        value={data.descricao}
                        onChange={valorInput}
                        required
                    />
                </FormGroup>
                <div className="d-flex justify-content-between flex-row-reverse p-2">
                    <Button type="submit" color="success">Atualizar</Button>
                    <Button type="reset" outline color="danger">Resetar</Button>
                </div>
            </Form>
        </Container>
    )
}