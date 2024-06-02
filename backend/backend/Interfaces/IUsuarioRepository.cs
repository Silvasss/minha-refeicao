using backend.Dtos;

namespace backend.Interfaces
{
    public interface IUsuarioRepository
    {
        Task<UsuarioDto> Get(string email);
        Task<bool> Update(UsuarioDto usuarioDto);
        Task<string> Delete(string email, string password);
        Task<string> AlteraSenha(string email, string password);
    }
}
