using backend.Dtos;
using backend.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace backend.Controllers
{
    [Route("usuario")]
    [ApiController]
    [Authorize]
    [Produces("application/json")]
    public class UsuarioController(IUsuarioRepository repository) : ControllerBase
    {
        private readonly IUsuarioRepository _repository = repository;

        // GET: api/<UsuarioController>
        [HttpGet]
        public async Task<UsuarioDto> Get()
        {
            return await _repository.Get(User.Claims.First(x => x.Type == "id").Value);
        }

        // PUT api/<UsuarioController>/5
        [HttpPut]
        public async Task<IActionResult> Put(UsuarioDto usuario)
        {
            usuario.Email = User.Claims.First(x => x.Type == "email").Value;

            await _repository.Update(usuario);

            return NoContent();
        }

        // PUT api/<UsuarioController>/5
        [HttpPut("recuperarsenha")]
        public async Task<IActionResult> PutSenha(string senha)
        {
            string resultado = await _repository.AlteraSenha(User.Claims.First(x => x.Type == "id").Value, senha);

            if (resultado == "a")
            {
                return NoContent();
            }

            return BadRequest(resultado);
        }

        // DELETE api/<UsuarioController>/5
        [HttpDelete("{password}")]
        public async Task<IActionResult> Delete(string password)
        {
            string resultado = await _repository.Delete(User.Claims.First(x => x.Type == "email").Value, password);

            if (resultado == "a")
            {
                return NoContent();
            }

            return BadRequest(resultado);
        }
    }
}
