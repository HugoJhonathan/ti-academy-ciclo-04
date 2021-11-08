import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Menu } from './components/menu';

import { Home } from './views/Home/';

import { CadastrarCliente } from './views/Cliente/Cadastrar'
import { ListarCliente } from './views/Cliente/Listar/';
import { EditarCliente } from './views/Cliente/Editar'
import { ListaPedidoCliente } from './views/Cliente/Item'

import { CadastrarServico } from './views/Servico/Cadastrar'
import { ListarServico } from './views/Servico/Listar/';
import { EditarServico } from './views/Servico/Editar'
import { Item } from './views/Servico/Item'

import {VerPedido} from './views/Pedido/Ver'
import {ListarPedidos} from './views/Pedido/Listar'
import {EditarPedido} from './views/Pedido/Editar'
import {CadastrarPedido} from './views/Pedido/Cadastrar'


function App() {

  
  return (
    <div className="App">
      
    <Router>
        <Menu/>
      <Switch>
          <Route exact path="/" component={Home}/>

          <Route path="/cadastrarcliente" component={CadastrarCliente}/>
          <Route path="/listar-cliente" component={ListarCliente}/>
          <Route path="/atualizacliente/:id" component={EditarCliente}/>
          <Route path="/listapedido/:id" component={ListaPedidoCliente}/>

          <Route path="/cadastrarservico" component={CadastrarServico}/>
          <Route path="/listar-servicos" component={ListarServico}/>
          <Route path="/atualizaservico/:id" component={EditarServico}/>
          <Route path="/listar-pedido/:id" component={Item}/>
          <Route path="/ver-pedido/:id" component={VerPedido}/>

          <Route path="/listar-pedido" component={ListarPedidos}/>
          <Route path="/atualizapedido/:id" component={EditarPedido}/>
          <Route path="/cadastrarpedido/" component={CadastrarPedido}/>
          
          
         
         
          
          
          
       </Switch>
     </Router>
    </div>
  );
}

export default App;
