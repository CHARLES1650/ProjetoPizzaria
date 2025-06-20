import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './paginas/Home';
import ListarPizzas from './paginas/Pizzas/ListarPizzas';
import CadastrarPizza from './paginas/Pizzas/CadastrarPizza';
import Erro from './paginas/Erro'; 
import Menu from './componentes/Menu'; 

function Rotas() {
  return (
    <BrowserRouter>
      <Menu /> {}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pizzas" element={<ListarPizzas />} />
        <Route path="/pizzas/cadastrar" element={<CadastrarPizza />} />
        {}
        <Route path="/pizzas/editar/:id" element={<CadastrarPizza />} />
        <Route path="*" element={<Erro />} /> {}
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;