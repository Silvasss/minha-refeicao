using backend.Dtos;
using backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace backend.Controllers
{
    [Route("")]
    [ApiController]
    [Produces("application/json")]
    public class VisitanteController(IVisitanteRepository repository) : ControllerBase
    {
        private readonly IVisitanteRepository _repository = repository;

        // GET: api/<VisitanteController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IndexUsuarioDto>>> Get()
        {
            var result = await _repository.GetAll();
            
            if (!result.Any())
            {
                return NotFound();
            }

            return Ok(result);
        }

        // GET api/<VisitanteController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UsuarioDto>> Get(string id)
        {
            var result = await _repository.GetById(id);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }
    }
}
