
import { Alert, Container, Table } from "reactstrap";

export const ServicosDoPedido = (props) => {
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
                        <td>{item.ItemPedido.quantidade}</td>
                        <td>{item.nome}</td>
                        <td>{item.descricao}</td>
                        <td>{item.ItemPedido.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                         {somaTotalPedido(Number(item.ItemPedido.valor * item.ItemPedido.quantidade))}
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