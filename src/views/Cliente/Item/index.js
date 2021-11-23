import axios from "axios";
import { api } from '../../../config'
import { Container, Table, Alert } from "reactstrap"
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import { ServicosDoPedido } from '../../Pedido/Components/ServicosDoPedido'
import { ServicosDaCompra } from '../../Pedido/Components/ServicosDaCompra'
import { TituloEBotao } from "../../../components/tituloEbotao";

export const ListaPedidoCliente = (props) => {

    document.title = "Cliente | Pedidos e Compras"

    const [dataPedido, setDataPedido] = useState([
        // {clientes:{nome:'eae'}}
    ]);
    const [dataCompra, setDataCompra] = useState([]);
    // const [nome, setNome] = useState([]);
    let { id } = useParams();

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const titulo = (x) => {
        return (
            <>
                {x} de <span style={{ textTransform: 'capitalize' }}>{dataPedido[0].clientes.nome.split(' ')[0]}</span>
            </>
        )
    }

    const getItens = async () => {
        await axios.get(`${api}/cliente/pedido/${id}`)
            .then((response) => {
                setDataPedido(response.data.ped);
                console.log('data', response.data);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a APIs.',
                });
            })
    }
    const getItensCompra = async () => {
        await axios.get(`${api}/cliente/compra/${id}`)
            .then((response) => {
                setDataCompra(response.data.ped);
                console.log('data', response.data);
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
        getItensCompra();
    }, [id]);

    if (dataPedido.length < 1) {
        return (
            <Container>

                <div className="p-2">
                    <div className="d-flex">
                        <div className="p-2 m-auto">
                            {/* <h1>Pedidos de <span style={{ textTransform: 'capitalize' }}>{dataPedido[0].clientes.nome.split(' ')[0]}</span></h1> */}
                        </div>
                        <div style={{ margin: 'auto 0' }}>
                            <Link to="/cadastrarservico"
                                className="btn btn-primary btn d-flex align-items-center">
                                <AddIcon />Cadastrar Pedido
                            </Link>
                        </div>
                    </div>
                    {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ''}
                </div>

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
            
            <TituloEBotao
                titulo={titulo('Pedidos')}
                btnLink={`/cadastrarpedido?cliente=${id}`}
                btnText="Adicionar Pedido"
                btnIcon="AddIcon"
                status={status}
            />

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

            <TituloEBotao
                titulo={titulo('Compras')}
                btnLink={`/cadastrarcompra?cliente=${id}`}
                btnText="Adicionar Compra"
                btnIcon="AddIcon"
                status={status}
            />
            <Table className="tablePedidos">
                <thead>
                    <tr>
                        <th>Compra</th>
                        <th>Data</th>
                        <th>Ação</th>
                        <th>Produtos</th>
                    </tr>
                </thead>
                <tbody>
                    {dataCompra.map(item => (
                        <tr key={item.id}>
                            <td>#{item.id}</td>
                            <td>{item.data}</td>
                            <td className="text-center/">
                                <Link to={"/ver-compra/" + item.id}
                                    className="btn btn-outline-primary">
                                    Consultar
                                </Link>
                            </td>
                            <td>
                                <ServicosDaCompra servicos={item.produtos_comp} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}