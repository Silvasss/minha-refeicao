using backend.Data;
using backend.Dtos;
using backend.Helpers;
using backend.Models;
using Firebase.Auth;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace backend.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthController(IConfiguration config, DataContext dataContext) : ControllerBase
    {
        private readonly DataContext _entityMongo = dataContext;
        private readonly AuthHelper _authHelper = new(config);
        private UserCredential userCredential;

        // POST api/<AuthController>
        [HttpPost("login")]
        public async Task<IActionResult> Post(UserForLoginDto user)
        {
            var client = _authHelper.InitFirebase();

            try
            {
                var signedInUserCrdential = await client.SignInWithEmailAndPasswordAsync(user.Email, user.Password);

                return Ok(new Dictionary<string, string> { { "token", signedInUserCrdential.User.Credential.IdToken } });
            }
            catch (FirebaseAuthException e)
            {
                string[] words = e.Message.Split(new[] { "Response:", "Reason:" }, StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries);

                JObject obj = JObject.Parse(words[1]);

                string message = (string)obj["error"]["message"];

                return BadRequest(message);
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> PostR(UserForRegistrationDto userForRegistration)
        {
            try
            {
                var client = _authHelper.InitFirebase();

                userCredential = await client.CreateUserWithEmailAndPasswordAsync(userForRegistration.Email, userForRegistration.Password);

                Usuario usuarioNovo = new()
                {
                    Usuario_Id = userCredential.User.Uid,
                    Email = userCredential.User.Info.Email,
                    Nome = userCredential.User.Uid
                };

                await _entityMongo.Usuarios.AddAsync(usuarioNovo);

                await _entityMongo.SaveChangesAsync();

                return Ok(new Dictionary<string, string> { { "token", userCredential.User.Credential.IdToken } });
            }
            catch (FirebaseAuthException e)
            {
                string[] words = e.Message.Split(new[] { "Response:", "Reason:" }, StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries);

                JObject obj = JObject.Parse(words[1]);

                string message = (string)obj["error"]["message"];

                return BadRequest(message);
            }
        }

        [HttpPost("recuperar")]
        public async Task<IActionResult> PostRecuperar(UserForLoginDto user)
        {
            var client = _authHelper.InitFirebase();

            try
            {
                await client.ResetEmailPasswordAsync(user.Email);

                return Ok();
            }
            catch (FirebaseAuthException e)
            {
                string[] words = e.Message.Split(new[] { "Response:", "Reason:" }, StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries);

                JObject obj = JObject.Parse(words[1]);

                string message = (string)obj["error"]["message"];

                return BadRequest(message);
            }
        }
    }
}
