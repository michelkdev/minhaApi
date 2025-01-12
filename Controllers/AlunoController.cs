using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

using MinhaAPI.Models;
using MinhaAPI.Services;

namespace MinhaAPI.Controllers {

  [Route("api/[controller]")]
  [ApiController]
  public class AlunoController : ControllerBase {

    private readonly IAlunoService _alunoService;

    public AlunoController(IAlunoService alunoService)
    {
        _alunoService = alunoService;
    }

    // GET: api/aluno
    [HttpGet]
    public ActionResult<string> Get()
    {
      var result = _alunoService.GetAlunos();

      return Ok(result);
    }

    // POST: api/aluno
    [HttpPost]
    public ActionResult<string> Post([FromBody] Dictionary<string, object> aluno)
    {
      var result = _alunoService.CreateAluno(aluno);

      if ( result )
       return Ok($"Aluno {aluno["nome"]} adicionado com sucesso!");
      else
        return BadRequest("Error.");
    }

    // PUT: api/aluno
    [HttpPut]
    public ActionResult Put([FromBody] Dictionary<string, object> aluno)
    {
      var result = _alunoService.UpdateAluno(aluno);

      if ( result )
       return Ok($"Aluno {aluno["nome"]} editado com sucesso!");
      else
        return BadRequest("Error.");
    }

    // DELETE: api/aluno
    [HttpDelete]
    public ActionResult Delete([FromBody] Dictionary<string, object> aluno)
    {
      //constraines
      if ( aluno.ContainsKey("id") == false )
        return Ok("Faltando ID como parametro.");

      if ( !(int.Parse(Convert.ToString(aluno["id"])) is int id) )
        return Ok("ID não é tipo inteiro.");

      var result = _alunoService.DeleteAluno(id);

      if ( result )
       return Ok($"Aluno deletado com sucesso!");
      else
        return BadRequest("Error.");
    }

  }
}

