import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Home } from './views/Home/';
import { ListarCliente } from './views/Cliente/Listar/';
import { ListarPedido } from './views/Pedido/Listar/';
import { ListarServico } from './views/Servico/Listar/';
import { Menu } from './components/menu';
import { Item } from './views/Servico/Item'

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
       </Switch>
     </Router>
    </div>
  );
}

export default App;
