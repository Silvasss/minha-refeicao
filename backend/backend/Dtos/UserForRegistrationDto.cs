namespace backend.Dtos
{
    public partial class UserForRegistrationDto
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
        public string? PasswordConfirm { get; set; }
    }
}
