using backend.Dtos;
using backend.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace backend.Controllers
{
    [Route("refeicao")]
    [ApiController]
    [Produces("application/json")]
    [Authorize]
    public class RefeicaoController(IRefeicaoRepository repository) : ControllerBase
    {
        private readonly IRefeicaoRepository _repository = repository;

        // GET: api/<RefeicaoController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RefeicaoDto>>> Get()
        {
            return Ok(await _repository.GetAll(User.Claims.First(x => x.Type == "id").Value));
        }

        // POST api/<RefeicaoController>
        [HttpPost]
        public async Task<IActionResult> Post(RefeicaoDto refeicoes)
        {
            await _repository.Post(refeicoes, User.Claims.First(x => x.Type == "id").Value);

            return Created();
        }

        // PUT api/<RefeicaoController>/5
        [HttpPut]
        public async Task<IActionResult> Put(IEnumerable<RefeicaoDto> refeicoes)
        {
            await _repository.Put(refeicoes, User.Claims.First(x => x.Type == "id").Value);

            return NoContent();
        }

        // DELETE api/<RefeicaoController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _repository.Delete(id, User.Claims.First(x => x.Type == "id").Value);

            return NoContent();
        }
    }
}