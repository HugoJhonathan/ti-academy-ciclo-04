import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Home } from './views/Home/';
import { ListarCliente } from './views/Cliente/Listar/';
import { ListarPedido } from './views/Pedido/Listar/';
import { ListarServico } from './views/Servico/Listar/';
import { Menu } from './components/menu';
import { Item } from './views/Servico/Item'
import { CadastrarServico } from './views/Servico/Cadastrar'
import { CadastrarCliente } from './views/Cliente/Cadastrar'

function App() {
  return (
    <div className="App">
      
    <Router>
        <Menu/>
       <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/listar-cliente" component={ListarCliente}/>
          {/* <Route path="/listar-pedido" component={ListarPedido}/> */}
          <Route path="/listar-servicos" component={ListarServico}/>
          <Route path="/listar-pedido/:id" component={Item}/>
          <Route path="/cadastrarservico" component={CadastrarServico}/>
          <Route path="/cadastrarcliente" component={CadastrarCliente}/>
       </Switch>
     </Router>
    </div>
  );
}

export default App;
