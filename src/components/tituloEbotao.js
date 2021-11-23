import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import { Alert } from "reactstrap";

export const TituloEBotao = (props) => {

    const IconeDoBotao = (props) =>{
        if(props === "VisibilityIcon"){
            return <VisibilityIcon/>
        }
        if(props === "AddIcon"){
            return <AddIcon/>
        }
        if(props === "EditIcon"){
            return <EditIcon/>
        }
    }
    
    return (
        <div className="p-2">
            <div className="divBoxTitulo">
                <div className="p-2 m-auto">
                    <h1>{props.titulo}</h1>
                </div>

                <div className="divButton">
                    <Link to={props.btnLink} id="btn" style={{padding: '0.4rem'}} className="btn btn-primary btn d-flex align-items-center btnTitulo">
                        {IconeDoBotao(props.btnIcon)}<span>{props.btnText}</span>
                        
                    </Link>
                </div>

            </div>
            {props.status.type === 'error' ? <Alert className="alertCabecalho" color="danger">{props.status.message}</Alert> : ''}
            {props.status.type === 'success' ? <Alert color="success">{props.status.message}</Alert> : ''}
        </div>
    )
}