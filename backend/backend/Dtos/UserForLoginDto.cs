namespace backend.Dtos
{
    public partial class UserForLoginDto
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
