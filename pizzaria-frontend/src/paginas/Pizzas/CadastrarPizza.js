import React, { useState, useEffect } from 'react';
import api from '../../api/api'; 
import { useNavigate, useParams } from 'react-router-dom'; 

function CadastrarPizza() {
  const navigate = useNavigate(); 
  const { id } = useParams(); 

  const [formData, setFormData] = useState({
    nome: '',
    ingredientes: '',
    preco: '',
    tamanho: 'Média',
    disponivel: true,
    tempo_preparo_min: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const fetchPizza = async () => {
        try {
          const response = await api.get(`/pizzas/${id}`);
          setFormData({
            nome: response.data.nome,
            ingredientes: response.data.ingredientes,
            preco: response.data.preco, 
            tamanho: response.data.tamanho,
            disponivel: response.data.disponivel,
            tempo_preparo_min: response.data.tempo_preparo_min,
          });
          setLoading(false);
        } catch (err) {
          setError('Erro ao carregar dados da pizza para edição.');
          setLoading(false);
          console.error('Erro ao buscar pizza para edição:', err);
        }
      };
      fetchPizza();
    } else {
      setLoading(false); 
    }
  }, [id]); 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError(null); 

    try {
      if (isEditing) {
        await api.put(`/pizzas/${id}`, formData);
        alert('Pizza atualizada com sucesso!');
      } else {
        await api.post('/pizzas', formData);
        alert('Pizza cadastrada com sucesso!');
      }
      navigate('/pizzas'); 
    } catch (err) {
      console.error('Erro ao enviar dados da pizza:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(`Erro: ${err.response.data.message}`);
      } else {
        setError('Ocorreu um erro ao processar sua solicitação. Verifique os dados e a API.');
      }
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Carregando formulário...</div>;
  if (error && isEditing) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>; 

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '20px auto', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2>{isEditing ? 'Editar Pizza' : 'Cadastrar Nova Pizza'}</h2>
      {error && !isEditing && <p style={{ color: 'red' }}>{error}</p>} {}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="nome" style={{ display: 'block', marginBottom: '5px' }}>Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label htmlFor="ingredientes" style={{ display: 'block', marginBottom: '5px' }}>Ingredientes:</label>
          <textarea
            id="ingredientes"
            name="ingredientes"
            value={formData.ingredientes}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', minHeight: '80px' }}
          ></textarea>
        </div>
        <div>
          <label htmlFor="preco" style={{ display: 'block', marginBottom: '5px' }}>Preço (R$):</label>
          <input
            type="number"
            id="preco"
            name="preco"
            value={formData.preco}
            onChange={handleChange}
            step="0.01" 
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label htmlFor="tamanho" style={{ display: 'block', marginBottom: '5px' }}>Tamanho:</label>
          <select
            id="tamanho"
            name="tamanho"
            value={formData.tamanho}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          >
            <option value="Pequena">Pequena</option>
            <option value="Média">Média</option>
            <option value="Grande">Grande</option>
            <option value="Família">Família</option>
          </select>
        </div>
        <div>
          <label htmlFor="tempo_preparo_min" style={{ display: 'block', marginBottom: '5px' }}>Tempo de Preparo (min):</label>
          <input
            type="number"
            id="tempo_preparo_min"
            name="tempo_preparo_min"
            value={formData.tempo_preparo_min}
            onChange={handleChange}
            required
            min="1"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            id="disponivel"
            name="disponivel"
            checked={formData.disponivel}
            onChange={handleChange}
            style={{ marginRight: '10px' }}
          />
          <label htmlFor="disponivel">Disponível para Venda</label>
        </div>
        <button
          type="submit"
          style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
        >
          {isEditing ? 'Atualizar Pizza' : 'Cadastrar Pizza'}
        </button>
        <button
          type="button"
          onClick={() => navigate('/pizzas')}
          style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', marginTop: '10px' }}
        >
          Voltar para a Lista
        </button>
      </form>
    </div>
  );
}

export default CadastrarPizza;