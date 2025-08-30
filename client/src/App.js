import { useEffect, useState } from "react";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/produtos`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar produtos");
        return res.json();
      })
      .then((data) => {
        setProdutos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>Loja Online 🚀</h1>
      </header>

      {loading && <div className="loader">Carregando produtos...</div>}
      {error && <div className="error">❌ {error}</div>}

      {!loading && !error && (
        <div className="products-grid">
          {produtos.length === 0 ? (
            <p>Nenhum produto encontrado.</p>
          ) : (
            produtos.map((p) => (
              <div key={p.id} className="product-card">
                <h2>{p.nome}</h2>
                <p>{p.descricao || "Sem descrição"}</p>
                <p className="price">
                  {new Intl.NumberFormat('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL' 
                  }).format(p.preco)}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;
