import axios from "axios";
import { api } from '../../../config/'
import { Container, Table, Toast, ToastHeader, ToastBody, Button } from "reactstrap"
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import VisibilityIcon from '@material-ui/icons/Visibility';
import { TituloEBotao } from "../../../components/tituloEbotao";


export const Item = (props) => {
    document.title = "Serviço | Informações"

    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalQuantidade, setTotalQuantidade] = useState(0);
    const { id } = useParams();
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    useEffect(() => {
        const getItens = async () => {
            await axios.get(`${api}/servico/${id}/pedidos`)
                .then((response) => {
                    setData(response.data.item);
                })
                .catch(() => {
                    setStatus({
                        type: 'error',
                        message: 'Erro: sem conexão com a API.',
                    });
                })
        }
        getItens();
    }, [id]);

    useEffect(() => {
        function estatisticas() {
            data.map(item => {
                setTotal(prev => prev += (item.valor * item.quantidade));
                setTotalQuantidade(prev => prev += item.quantidade);
                return false
            });
        }
        estatisticas();
    }, [data]);

    return (
        <div>
            <Container>
                
                <TituloEBotao
                    titulo="Informações do Serviço"
                    btnLink="/listar-servicos"
                    btnText="Ver Serviços"
                    btnIcon="VisibilityIcon"
                    status={status}
                />

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
                <Table className="rounded" hover striped bordered responsive>
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