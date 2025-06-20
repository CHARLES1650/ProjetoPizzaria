import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';

function ListarPizzas() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await api.get('/pizzas');
        setPizzas(response.data);
        setLoading(false);
      } catch (err) {
        setError('Falha ao carregar pizzas. Verifique a API e a conexão.');
        setLoading(false);
        console.error('Erro ao buscar pizzas:', err);

        if (err.response) {
            console.error('Dados do erro:', err.response.data);
            console.error('Status do erro:', err.response.status);
            console.error('Headers do erro:', err.response.headers);
        } else if (err.request) {
            console.error('Requisição feita, mas sem resposta:', err.request);
        } else {
            console.error('Erro na configuração da requisição:', err.message);
        }
      }
    };

    fetchPizzas();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta pizza?')) {
      try {
        await api.delete(`/pizzas/${id}`);

        setPizzas(pizzas.filter(pizza => pizza.id !== id));
      } catch (err) {
        console.error('Erro ao excluir pizza:', err);
        alert('Falha ao excluir pizza. Tente novamente.');
      }
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Carregando pizzas...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Cardápio de Pizzas</h2>
      <Link to="/pizzas/cadastrar" style={{ display: 'inline-block', margin: '10px 0', padding: '10px 15px', background: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
        Cadastrar Nova Pizza
      </Link>
      {pizzas.length === 0 ? (
        <p>Nenhuma pizza cadastrada ainda.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ background: '#f2f2f2' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Nome</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Preço</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Tamanho</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Disponível</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Tempo Preparo (min)</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Ingredientes</th> {/* <-- NOVO: Coluna de Ingredientes */}
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pizzas.map((pizza) => (
              <tr key={pizza.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{pizza.id}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{pizza.nome}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>R$ {pizza.preco.toFixed(2)}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{pizza.tamanho}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{pizza.disponivel ? 'Sim' : 'Não'}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{pizza.tempo_preparo_min}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{pizza.ingredientes}</td> {/* <-- NOVO: Conteúdo dos Ingredientes */}
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <Link to={`/pizzas/editar/${pizza.id}`} style={{ marginRight: '10px', color: '#007bff', textDecoration: 'none' }}>Editar</Link>
                  <button onClick={() => handleDelete(pizza.id)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '3px' }}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListarPizzas;