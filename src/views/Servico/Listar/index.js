import axios from "axios";
import { api } from '../../../config/'

import { Container, Table, Alert, FormGroup, Label, Input, Button } from "reactstrap"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import VisibilityIcon from '@material-ui/icons/Visibility';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


export const ListarServico = () => {
    //   dados obtidos
    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getServicos = async () => {
        await axios.get(api + '/listaservicos')
            .then((response) => {
                console.log(response.data.servicos);
                setData(response.data.servicos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.',
                });
                // console.log("Erro: sem conexão com a API.")
            })
    }

    useEffect(() => {
        getServicos();
    }, []);



    return (

        <Container>
            <div className="p-2">
                <div className="d-flex">
                    <div className="p-2 m-auto">
                        <h1>Visualizar informações do serviço</h1>
                    </div>

                    <div style={{ margin: 'auto 0' }}>
                        <Link to="/cadastrarservico"
                            className="btn btn-outline-primary btn-sm">
                            Cadastrar
                        </Link>
                    </div>

                </div>
                {status.type === 'error' ? <Alert color="danger">
                    {status.message}
                </Alert> : ''}
            </div>
            <div className="p-2">
            
                <Table hover striped bordered>
                
                    <thead>
                        <tr>
                            <th >ID</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th className="text-center" style={{width: '120px'}}>Ação</th>
                        </tr>
                    </thead>
                    <tbody style={{ borderTop: 'none' }}>

                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.descricao}</td>
                                <td className="d-flex text-center">
                                <div className="d-flex text-center align-middle">
                                        <Link to={"/listar-pedido/" + item.id}>
                                            <Button className="btn btn-sm m-1 btn-success p-1">
                                                <VisibilityIcon />
                                            </Button>
                                        </Link>

                                        <Link to={"/atualizaservico/" + item.id}>
                                            <Button className="btn btn-sm m-1 btn-warning p-1">
                                                <EditIcon />
                                            </Button>
                                        </Link>

                                        <Link to={"/listapedido/" + item.id}>
                                            <Button className="btn btn-sm btn-danger m-1 p-1">
                                                <DeleteForeverIcon />
                                            </Button>
                                        </Link>
                                    </div>  
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

        </Container>

    )
}