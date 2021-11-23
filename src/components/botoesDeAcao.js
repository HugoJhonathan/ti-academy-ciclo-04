import { Link } from "react-router-dom";
import { Button, ButtonDropdown, DropdownMenu, DropdownToggle, UncontrolledTooltip } from "reactstrap";
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MoreVert from '@material-ui/icons/MoreVert';
import { useState } from "react";

export const BotoesDeAcao = (props) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="d-flex text-center align-middle boxBtnAction"> 
            <ButtonDropdown
                toggle={() => setIsOpen(!isOpen)}
                isOpen={isOpen}
            >
                <DropdownToggle caret color="secondary">
                    <MoreVert/>
                </DropdownToggle>
                <DropdownMenu>
                    <div className="boxBtns">
                        <Link id={`btnVisualizar${props.id}`} to={props.linkVisualizar}>
                            <Button className="btn btn-sm m-1 btn-success p-1 btnActionVer">
                                <VisibilityIcon />
                            </Button>
                            <UncontrolledTooltip placement="bottom" target={`btnVisualizar${props.id}`}>Visualizar</UncontrolledTooltip>
                        </Link>
                        <Link id={`btnEditar${props.id}`} to={props.linkEditar}>
                            <Button className="btn btn-sm m-1 btn-warning p-1 btnActionEditar">
                                <EditIcon />
                            </Button>
                            <UncontrolledTooltip placement="bottom" target={`btnEditar${props.id}`}>Editar</UncontrolledTooltip>
                        </Link>
                        <Button id={`btnExcluir${props.id}`} onClick={() => props.btnExcluir()} className="btn btn-sm btn-danger m-1 p-1 btnActionDelete">
                            <DeleteForeverIcon />
                            <UncontrolledTooltip placement="bottom" target={`btnExcluir${props.id}`}>Excluir</UncontrolledTooltip>
                        </Button>
                    </div>
                </DropdownMenu>
            </ButtonDropdown>
        </div>
    )
}