using AutoMapper;
using backend.Data;
using backend.Dtos;
using backend.Helpers;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Firebase.Auth;
using Newtonsoft.Json.Linq;

namespace backend.Repositories
{
    public class UsuarioRepository(IConfiguration config, DataContext dataContext) : IUsuarioRepository
    {
        private readonly DataContext _entityMongo = dataContext;

        private readonly AuthHelper _authHelper = new(config);

        private readonly Mapper _mapper = new(new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<Usuario, UsuarioDto>().ReverseMap();
        }));

        public async Task<string> AlteraSenha(string email, string password)
        {
            //-----------------------------------------ATENÇÃO----------------------------------------------------------
            // Esse código não é utilizado, pois não encontrei como alterar a senha de um usuário logado pela dependência
            //----------------------------------------------------------------------------------------------------------

            var client = _authHelper.InitFirebase();

            try
            {
                var signedInUserCrdential = await client.SignInWithEmailAndPasswordAsync(email, password);

                return "a";
            }
            catch (FirebaseAuthException e)
            {
                string[] words = e.Message.Split(new[] { "Reason:" }, StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries);

                return words[1];
            }
        }

        public async Task<string> Delete(string email, string password)
        {
            var client = _authHelper.InitFirebase();

            try
            {
                var signedInUserCrdential = await client.SignInWithEmailAndPasswordAsync(email, password);

                Usuario dados = await _entityMongo.Usuarios.FirstAsync(a => a.Email == email);

                await client.User.DeleteAsync();

                _entityMongo.Usuarios.Remove(dados);

                if (await _entityMongo.SaveChangesAsync() > 0)
                {
                    return "a";
                }
                else
                {
                    return "Error";
                }
            }
            catch (FirebaseAuthException e)
            {
                string[] words = e.Message.Split(new[] { "Response:", "Reason:" }, StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries);

                JObject obj = JObject.Parse(words[1]);

                string message = (string)obj["error"]["message"];

                return message;
            }
        }

        public async Task<UsuarioDto> Get(string email)
        {
            return _mapper.Map<UsuarioDto>(await _entityMongo.Usuarios.FirstAsync(u => u.Usuario_Id == email));
        }

        public async Task<bool> Update(UsuarioDto usuarioDto)
        {
            Usuario userDb = await _entityMongo.Usuarios.FirstAsync(u => u.Email == usuarioDto.Email);

            userDb.Nome = usuarioDto.Nome;
            userDb.Tiktok = usuarioDto.Tiktok;
            userDb.Outras = usuarioDto.Outras;

            await _entityMongo.SaveChangesAsync();

            return true;
        }
    }
}
