import axios from "axios";
import { api } from '../../../config'
import { Container, Table, Alert } from "reactstrap"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import { ServicosDoPedido } from '../../Pedido/Components/ServicosDoPedido'

export const ListaPedidoCliente = (props) => {
    
    console.log(props.match.params.id);
    const [dataPedido, setDataPedido] = useState([]);
    const [nome, setNome] = useState([]);
    const [id, setId] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getItens = async () => {
        await axios.get(`${api}/cliente/pedido/${id}`)
            .then((response) => {
                setDataPedido(response.data.ped);
                console.log(response.data.ped);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a APIs.',
                });
            })
    }

    useEffect(() => {
        getItens();
    }, [id]);

    if (dataPedido.length < 1) {
        return (
            <Container>
                <div className="p-2">
                    <Alert color="warning">
                        Este cliente não possui pedidos!
                    </Alert>
                </div>
            </Container>
        )
    }

    return (
            <Container>
                <div className="p-2">
                    <div className="d-flex">
                        <div className="p-2 m-auto">
                            <h1>Pedidos de <span style={{textTransform: 'capitalize'}}>{dataPedido[0].clientes.nome.split(' ')[0]}</span></h1>
                        </div>
                        <div style={{ margin: 'auto 0' }}>
                            <Link to="/cadastrarservico"
                                className="btn btn-primary btn d-flex align-items-center">
                                <AddIcon />Cadastrar Cliente
                            </Link>
                        </div>
                    </div>
                    {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ''}
                </div>

                <Table className="tablePedidos">
                    <thead>
                        <tr>
                            <th>Pedido</th>
                            <th>Data</th>
                            <th>Ação</th>
                            <th>Produtos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataPedido.map(item => (
                            <tr key={item.id}>
                                <td>#{item.id}</td>
                                <td>{item.data}</td>
                                <td className="text-center/">
                                    <Link to={"/ver-pedido/" + item.id}
                                        className="btn btn-outline-primary">
                                        Consultar
                                    </Link>
                                </td>
                                <td>
                                    <ServicosDoPedido servicos={item.servicos_ped} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
    )
}