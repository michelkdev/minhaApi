using MinhaAPI.Models;

namespace MinhaAPI.Services {
  public interface IAlunoService {
    List<Aluno> GetAlunos();
    bool CreateAluno(Dictionary<string, object> aluno);
    bool UpdateAluno(Dictionary<string, object> aluno);
    bool DeleteAluno(int aluno);
  }
}
