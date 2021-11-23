import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
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
      <Routes>

          <Route path="/" element={<Home/>}/>

          <Route path="/cadastrarcliente" element={<CadastrarCliente/>}/>
          <Route path="/listar-cliente" element={<ListarCliente/>}/>
          <Route path="/atualizacliente/:id" element={<EditarCliente/>}/>
          <Route path="/listapedido/:id" element={<ListaPedidoCliente/>}/>

          <Route path="/cadastrarservico" element={<CadastrarServico/>}/>
          <Route path="/listar-servicos" element={<ListarServico/>}/>
          <Route path="/atualizaservico/:id" element={<EditarServico/>}/>
          <Route path="/listar-pedido/:id" element={<Item/>}/>

          <Route path="/ver-pedido/:id" element={<VerPedido/>}/>
          <Route path="/listar-pedido" element={<ListarPedidos/>}/>
          <Route path="/atualizapedido/:id" element={<EditarPedido/>}/>
          <Route path="/cadastrarpedido/" element={<CadastrarPedido/>}/>
          
          <Route path="/listar-produtos" element={<ListarProduto/>}/>
          <Route path="/cadastrarproduto" element={<CadastrarProduto/>}/>
          <Route path="/atualizaproduto/:id" element={<EditarProduto/>}/>
          <Route path="/listar-produto/:id" element={<ItemProduto/>}/>

          <Route path="/ver-compra/:id" element={<VerCompra/>}/>
          <Route path="/listar-compras" element={<ListarCompras/>}/>
          <Route path="/atualizacompra/:id" element={<EditarCompra/>}/>
          <Route path="/cadastrarcompra/" element={<CadastrarCompra/>}/>              
    
       </Routes>
     </Router>
    </div>
  );
}

export default App;
