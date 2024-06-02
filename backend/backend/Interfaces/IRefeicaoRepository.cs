using backend.Dtos;

namespace backend.Interfaces
{
    public interface IRefeicaoRepository
    {
        Task<IEnumerable<RefeicaoDto>> GetAll(string email);
        Task<bool> Post(RefeicaoDto refeicao, string userId);
        Task<bool> Put(IEnumerable<RefeicaoDto> refeicao, string userId);
        Task<bool> Delete(string refeicaoId, string userId);
    }
}