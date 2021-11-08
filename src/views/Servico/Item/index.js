import axios from "axios";
import { api } from '../../../config/'
import { Container, Table, Alert, Toast, ToastHeader, ToastBody, Button } from "reactstrap"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VisibilityIcon from '@material-ui/icons/Visibility';

export const Item = (props) => {

    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    let total_inc = total;

    const [totalQuantidade, setTotalQuantidade] = useState(0);
    let totalQuantidadeInc = totalQuantidade;

    const [id, setId] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });
    
    const getItens = async () => {
        total_inc = 0;
        await axios.get(`${api}/servico/${id}/pedidos`)
            .then((response) => {
                console.log(response.data.item);
                setData(response.data.item);
                response.data.item.map(item => {
                    setTotal(total_inc += (item.valor * item.quantidade));
                    setTotalQuantidade(totalQuantidadeInc += item.quantidade);
                });
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.',
                });
            })
    }

    useEffect(() => {
        getItens();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="p-2">
                    <div className="d-flex">
                        <div className="p-2 m-auto">
                            <h1>Informações do Serviço</h1>
                        </div>
                        <div style={{ margin: 'auto 0' }}>
                            <Link to="/listar-servicos"
                                className="btn btn-primary btn d-flex align-items-center">
                                <VisibilityIcon />Listar Serviços
                            </Link>
                        </div>
                    </div>
                    {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ''}
                </div>
                <div className="mb-4">
                    <Toast className="">
                        <ToastHeader>
                            Estatísticas
                        </ToastHeader>
                        <ToastBody>
                            <p>Este serviço apareceu em <strong>{data.length} pedidos.</strong></p>
                            <p>Sendo executado <strong>{totalQuantidade} vezes.</strong></p>
                            <p>Com total de faturamento de <strong>{total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}.</strong></p>
                        </ToastBody>
                    </Toast>
                </div>
                <Table className="rounded" hover striped bordered>
                    <thead>
                        <tr>
                            <th>Pedido Id</th>
                            <th>Servico Id</th>
                            <th>Serviço</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th style={{ width: '131px' }}>Visualizar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.ServicoId}>
                                <td>{item.PedidoId}</td>
                                <td>{item.ServicoId}</td>
                                <td>{item.servicos.nome}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                                <td className="text-center/">
                                    <Link to={"/ver-pedido/" + item.PedidoId}>
                                        <Button className="btn btn-sm m-1 btn-success p-1">
                                            <VisibilityIcon />Ver pedido
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}