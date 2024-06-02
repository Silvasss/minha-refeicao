using backend.Dtos;

namespace backend.Interfaces
{
    public interface IMedicacaoRepository
    {
        Task<IEnumerable<MedicacaoDto>> Get(string email);
        Task<bool> Post(IEnumerable<MedicacaoDto> dto, string userId);
        Task<bool> Put(IEnumerable<MedicacaoDto> dto, string userId);
        Task<bool> Delete(string userId, IEnumerable<MedicacaoDto> medicacao);
    }
}
