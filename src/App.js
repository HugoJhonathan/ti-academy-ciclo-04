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

import { ListarProduto } from './views/Produto/Listar/';
import { CadastrarProduto } from './views/Produto/Cadastrar'
import { EditarProduto} from './views/Produto/Editar'
import { ItemProduto } from './views/Produto/Item'

import {VerCompra} from './views/Compra/Ver'
import {ListarCompras} from './views/Compra/Listar'
import {EditarCompra} from './views/Compra/Editar'
import {CadastrarCompra} from './views/Compra/Cadastrar'

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
          
          <Route path="/listar-produtos" component={ListarProduto}/>
          <Route path="/cadastrarproduto" component={CadastrarProduto}/>
          <Route path="/atualizaproduto/:id" component={EditarProduto}/>
          <Route path="/listar-produto/:id" component={ItemProduto}/>

          <Route path="/ver-compra/:id" component={VerCompra}/>
          <Route path="/listar-compras" component={ListarCompras}/>
          <Route path="/atualizacompra/:id" component={EditarCompra}/>
          <Route path="/cadastrarcompra/" component={CadastrarCompra}/>              
    
       </Switch>
     </Router>
    </div>
  );
}

export default App;
