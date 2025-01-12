import React, { useState, useEffect } from 'react';

function App() {
  const [alunos, setAlunos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alunoEditando, setAlunoEditando] = useState(null);
  const [formData, setFormData] = useState({ id: 0, nome: "", idade: "", cidade: "" });

  useEffect(() => {
    // Simulando a busca dos dados dos alunos
    fetch('http://localhost:5001/api/aluno')
      .then(response => response.json())
      .then(data => setAlunos(data))
      .catch(error => console.error('Erro ao buscar alunos:', error));
  }, []);

  // Função de excluir aluno (simulação)
  const excluirAluno = (id) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este aluno?');

    if (confirmDelete) {
      fetch(`http://localhost:5001/api/aluno`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "id": id }),
      })
      .then(response => {
        if (response.ok) {
          setAlunos(alunos.filter(aluno => aluno.id !== id));
        } else {
          alert('Erro ao excluir aluno.');
        }
      })
      .catch(error => console.error('Erro na requisição DELETE:', error));
    }
  };





  const NovoAluno = () => {
    setAlunoEditando(null);
    setFormData({ nome: '', idade: '', cidade: '' });
    setIsModalOpen(true);
  };

  const editarAluno = (aluno) => {
    setAlunoEditando(aluno);
    setFormData({ id: aluno.id, nome: aluno.nome, idade: aluno.idade, cidade: aluno.cidade });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const salvarAlteracoes = () => {
    fetch(`http://localhost:5001/api/aluno/`, {
      method: alunoEditando !== null ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if (response.ok) {
        if ( alunoEditando !== null )
          setAlunos(alunos.map(aluno =>
            aluno.id === alunoEditando.id ? { ...formData } : aluno
          ));

        alunoEditando !== null ? alert("Alterado com sucesso!") : alert("Criado com sucesso!");

        var clique = new Event('click');
        document.getElementById("ButtonDismiss").dispatchEvent(clique);

        window.location.reload();

      } else {
        alert('Erro ao editar aluno.');
      }
    })
    .catch(error => console.error('Erro na requisição PUT:', error));
  };

  return (
    <>
      <header data-bs-theme="dark">
        <div className="navbar navbar-dark bg-dark shadow-sm">
          <div className="container">
            <a href="#" className="navbar-brand text-center" style={{ width: '100%' }}>
              <h1>Lista de Alunos</h1>
            </a>
          </div>
        </div>
      </header>


      <div className="container mt-5">
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
               <h5 className="modal-title fs-5">Editar Aluno</h5>
               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="modal-body">

                <form>
                  <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input type="email" name="nome" className="form-control" value={formData.nome} onChange={handleInputChange} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Idade</label>
                    <input type="text" name="idade" className="form-control" value={formData.idade} onChange={handleInputChange} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Cidade</label>
                    <input type="text" name="cidade" className="form-control" value={formData.cidade} onChange={handleInputChange} />
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" id="ButtonDismiss" data-bs-dismiss="modal" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button className="btn btn-primary" onClick={salvarAlteracoes}>Salvar</button>
              </div>

            </div>
          </div>
        </div>

        <div style={{ width: '100%', textAlign: 'right' }}>
          <button
            type="button"
            className="btn btn-info btn-sm me-2"
            style={{ marginBottom: '10px', position: 'relative', right: '-7px' }}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => NovoAluno()} >
              <span style={{ marginRight: '4px', fontSize: '16px', fontWeight: 700, lineHeight: '1px' }}>+</span>
              Novo Aluno
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-bordered text-center">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Idade</th>
                <th>Cidade</th>
                <th>Ações</th>
              </tr>
            </thead>
              <tbody>
                {alunos.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">Nenhum aluno encontrado</td>
                  </tr>
                  ) : (
                      alunos.map(aluno => (
                          <tr key={aluno.id}>
                              <td>{aluno.id}</td>
                              <td>{aluno.nome}</td>
                              <td>{aluno.idade}</td>
                              <td>{aluno.cidade}</td>
                              <td>
                                  <button
                                      type="button"
                                      className="btn btn-primary btn-sm me-2"
                                      data-bs-toggle="modal"
                                      data-bs-target="#exampleModal"
                                      onClick={() => editarAluno(aluno)}>
                                      Editar
                                  </button>
                                  <button
                                      className="btn btn-danger btn-sm"
                                      onClick={() => excluirAluno(aluno.id)}>
                                      Excluir
                                  </button>
                              </td>
                          </tr>
                      ))
                  )}
              </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
