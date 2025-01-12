using Npgsql;

using MinhaAPI.Models;

namespace MinhaAPI.Services
{
  public class AlunoService : IAlunoService
  {
    private readonly string _connString = "Host=localhost;Username=postgres;Password=admin;Database=postgres;";

    public List<Aluno> GetAlunos()
    {
        List<Aluno> alunos = new List<Aluno>();

        using (var conn = new NpgsqlConnection(_connString)) {
          conn.Open();

          string query = "SELECT * FROM \"Alunos\"";

          using (var cmd = new NpgsqlCommand(query, conn))
            using (var reader = cmd.ExecuteReader()) {
              while (reader.Read()) {
                alunos.Add(new Aluno {
                  id = reader.GetInt32(0),
                  nome = reader.IsDBNull(1) ? null : reader.GetString(1),
                  idade = reader.GetInt32(2),
                  cidade = reader.IsDBNull(3) ? null : reader.GetString(3)
                });
              }
            }
        }

        return alunos;
    }

    public bool CreateAluno(Dictionary<string, object> aluno)
    {
      using ( var connection = new NpgsqlConnection(_connString) ) {
        connection.Open();

        var columns = string.Join(", ", aluno.Keys.Select(k => $"\"{k}\""));
        var parameters = string.Join(", ", aluno.Values.Select(k => $"'{k}'"));

        var query = $"INSERT INTO \"Alunos\" ({columns}) VALUES ({parameters})";

        using (var command = new NpgsqlCommand(query, connection)) {
          foreach (var item in aluno) {
            command.Parameters.AddWithValue("@" + item.Key, item.Value ?? DBNull.Value);
          }

          command.ExecuteNonQuery();
        }
      }

      return true;
    }

    public bool UpdateAluno(Dictionary<string, object> aluno)
    {
      string query = string.Empty;

      var idAluno = aluno["id"];
      aluno = aluno
          .Where(item => !item.Key.Equals("id", StringComparison.OrdinalIgnoreCase))
          .ToDictionary(item => item.Key, item => item.Value);

      using (var conn = new NpgsqlConnection(_connString)) {
        conn.Open();

        query = $"SELECT COUNT(*) FROM \"Alunos\" WHERE \"id\" = {idAluno} LIMIT 1";

        using ( var command = new NpgsqlCommand(query, conn) ) {

          int count = Convert.ToInt32(command.ExecuteScalar());

          if ( count == 0 )
            return false;
        }

        List<string> param = new List<string>(aluno.Select(item => $"\"{item.Key}\" = '{item.Value}'"));

        query = $"UPDATE \"Alunos\" SET {string.Join(", ", param)} WHERE \"id\" = {idAluno};";

        using ( var command = new NpgsqlCommand(query, conn) ) {
          command.ExecuteNonQuery();
        }
      }

      return true;
    }

    public bool DeleteAluno(int idAluno) {

      using ( var conn = new NpgsqlConnection(_connString) ) {
        conn.Open();

        var query = $"DELETE FROM \"Alunos\" WHERE \"id\" = {idAluno};";

        using ( var command = new NpgsqlCommand(query, conn) ) {
          command.ExecuteNonQuery();
        }
      }

      return true;
    }


  }
}
