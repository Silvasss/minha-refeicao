using backend.Dtos;

namespace backend.Interfaces
{
    public interface IVisitanteRepository
    {
        Task<IEnumerable<IndexUsuarioDto>> GetAll();
        Task<UsuarioDto> GetById(string id);
    }
}
