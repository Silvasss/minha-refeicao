using backend.Dtos;
using backend.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace backend.Controllers
{
    [Route("medicacao")]
    [ApiController]
    [Produces("application/json")]
    [Authorize]
    public class MedicacaoController(IMedicacaoRepository repository) : ControllerBase
    {
        private readonly IMedicacaoRepository _repository = repository;

        // GET: api/<MedicacaoController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedicacaoDto>>> Get()
        {
            return Ok(await _repository.Get(User.Claims.First(x => x.Type == "id").Value));
        }

        // POST api/<MedicacaoController>
        [HttpPost]
        public async Task<IActionResult> Post(IEnumerable<MedicacaoDto> medicacao)
        {
            await _repository.Post(medicacao, User.Claims.First(x => x.Type == "id").Value);

            return Created();
        }

        // PUT api/<MedicacaoController>/5
        [HttpPut]
        public async Task<IActionResult> Put(IEnumerable<MedicacaoDto> medicacao)
        {
            if (await _repository.Put(medicacao, User.Claims.First(x => x.Type == "id").Value))
            {
                return NoContent();
            }

            return NotFound();
        }

        // DELETE api/<MedicacaoController>/5
        [HttpDelete]
        public async Task<IActionResult> Delete(IEnumerable<MedicacaoDto> medicacao)
        {
            await _repository.Delete(User.Claims.First(x => x.Type == "id").Value, medicacao);

            return NoContent();
        }
    }
}
