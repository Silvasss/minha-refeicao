using Firebase.Auth.Providers;
using Firebase.Auth;

namespace backend.Helpers
{
    public class AuthHelper(IConfiguration config)
    {
        private readonly IConfiguration _config = config;

        public FirebaseAuthClient InitFirebase()
        {
            var config = new FirebaseAuthConfig
            {
                ApiKey = _config.GetSection("AppSettings:API_KEY_FIREBASE").Value,
                AuthDomain = _config.GetSection("AppSettings:AUTH_DOMAIN_KEY_FIREBASE").Value,
                Providers = new FirebaseAuthProvider[]
                {
                    new EmailProvider()
                }
            };
            
            var client = new FirebaseAuthClient(config);

            return client;
        }
    }
}
