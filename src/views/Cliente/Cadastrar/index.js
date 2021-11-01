import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

let day = new Date().toLocaleDateString("en-CA",{year:"numeric",month:"2-digit", day:"2-digit"}).replace('/','-');

export const CadastrarCliente = () => {


    const [cliente, setCliente] = useState({
        nome:"",
        descricao:""
    });

    const [status, setStatus] = useState({
        type:"",
        message:""
    })
    const valorInput = e => setCliente({
        ...cliente,[e.target.name]: e.target.value
    });

    const cadCliente = async e =>{
        e.preventDefault();
        console.log(cliente);

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api+'/cliente', cliente, {headers})
        .then((response)=>{
            if(response.data.error){
                setStatus({
                    type: 'error',
                    message: response.data.message
                });
            }else{
                setStatus({
                    type: 'success',
                    message: response.data.message
                }); 
            }
        }).catch(()=>{
            console.log("Sem conexão com API");
        })

    }



    return (
        <Container>
            <div className="p-2">
            <div className="d-flex">
                <div className="p-2 m-auto">
                    <h1>Cadastrar Cliente</h1>
                </div>
                <div style={{margin:'auto 0'}}>
                    <Link to="/listar-cliente" className="btn btn-outline-dark    btn-sm">
                        Visualizar Clientes
                    </Link>
                </div>

            </div>
           
            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert>: ''}
            {status.type === 'success' ? <Alert color="success">{status.message}</Alert>: ''}
            </div>
            <Form onSubmit={cadCliente}>
                <FormGroup className="p-2">
                    <Label>
                        Nome
                    </Label>
                    <Input
                        required="true"
                        name="nome"
                        placeholder="Nome do serviço"
                        type="text"
                        onChange={valorInput}
                    />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>
                        Endereço
                    </Label>
                    <Input
                    required="true"
                        name="endereco"
                        placeholder="Rua, Número e bairro"
                        type="text"
                        onChange={valorInput}
                    />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>
                        Cidade
                    </Label>
                    <Input
                    required="true"
                        name="cidade"
                        placeholder="Cidade"
                        type="text"
                        onChange={valorInput}
                    />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>
                        UF
                    </Label>
                    <Input
                    required="true"
                        name="uf"
                        placeholder="Estado"
                        type="text"
                        onChange={valorInput}
                    />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>
                        Data de nascimento
                    </Label>
                    <Input
                    required="true"
                        name="nascimento"
                        
                        type="date"
                        onChange={valorInput}
                    />
                </FormGroup>
                
                <FormGroup className="p-2">
                    <Label>
                        Cliente Desde
                    </Label>
                    <Input
                        required="true"
                        name="clienteDesde"
                        placeholder=""
                        max={day}
                        type="date"
                        onChange={valorInput}
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

    );
};