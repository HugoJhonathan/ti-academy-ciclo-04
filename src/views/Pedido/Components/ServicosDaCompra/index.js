
import { Alert, Container, Table } from "reactstrap";

export const ServicosDaCompra = (props) => {
    let totalPedido = 0;
    const somaTotalPedido = (valor) => {
        totalPedido += Number(valor);
    }

    const data = props.servicos;

    if (data.length < 1) {
        return (
            <Container>
                <div className="p-2">
                    <Alert className="m-0" color="warning">
                        Este pedido não possui Itens!
                    </Alert>
                </div>
            </Container>
        )
    }


    return (
        <Table className="mb-0" hover striped bordered responsive>
            <thead>
                <tr>
                    <th style={{ width: "80px" }}>Qtd.</th>
                    <th>Serviços</th>
                    <th>Descrição</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody>

                {data.map(item => (
                    <tr key={item.id}>
                        <td>{item.ItemCompra.quantidade}</td>
                        <td>{item.nome}234234</td>
                        <td>{item.descricao}</td>
                        <td>{item.ItemCompra.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                        {somaTotalPedido(Number(item.ItemCompra.valor * item.ItemCompra.quantidade))}
                    </tr>
                ))}

            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="4">{`TOTAL: ${totalPedido.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`}</td>
                </tr>
            </tfoot>
        </Table>
    )
}