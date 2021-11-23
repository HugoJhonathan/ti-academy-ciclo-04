import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";
import { api } from "../config";

export const ModalExclusao = (props) => {
    
    let key = props.itemDeletar;
  
    const deletarItem = async () => {

        if (key === 'ServicoId' || key === 'ProdutoId') { // 

            let obj = {};
            props.itemDeletar === 'ServicoId' ? obj[key] = props.item.ServicoId : obj[key] = props.item.ProdutoId;

            await axios.delete(api + props.url, { data: obj, headers: { "Authorization": "" } })
                .then((response) => {
                    // console.log(response);
                    props.closeModal();
                    props.atualizar();
                })
                .catch(() => {
                    console.log("Erro: sem conexão com a API.");
                    props.closeModal();
                });
        }


        if (key === 'key') {

            await axios.delete(api + props.url, { headers: { "Authorization": "" } })
                .then((response) => {
                    console.log(response);
                    props.closeModal();
                    props.atualizar();
                })
                .catch(() => {
                    console.log("Erro: sem conexão com a API.");
                    props.closeModal();
                });
        }
    }

    return (
        <Modal autoFocus={false} returnFocusAfterClose={false} fade={false} backdrop={true} isOpen={props.closeModal} toggle={() => props.closeModal()}>
            <ModalHeader toggle={() => props.closeModal()}>
                Deseja excluir {props.item.nome}?
            </ModalHeader>
            <ModalBody>
                A exclusão é permanente e não poderá ser revertida!
            </ModalBody>
            <ModalFooter>
                <Button id="btnSim" color="danger" autoFocus onClick={deletarItem}>Sim</Button>
                <Button color="success" onClick={() => props.closeModal()}>Não</Button>
            </ModalFooter>
        </Modal>
    )
}