import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <nav style={{ background: '#333', padding: '10px', color: 'white' }}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', justifyContent: 'space-around' }}>
        <li style={{ margin: '0 10px' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        </li>
        <li style={{ margin: '0 10px' }}>
          <Link to="/pizzas" style={{ color: 'white', textDecoration: 'none' }}>Listar Pizzas</Link>
        </li>
        <li style={{ margin: '0 10px' }}>
          <Link to="/pizzas/cadastrar" style={{ color: 'white', textDecoration: 'none' }}>Cadastrar Pizza</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;