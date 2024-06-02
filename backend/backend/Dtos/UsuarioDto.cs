using backend.Models;

namespace backend.Dtos
{
    public class IndexUsuarioDto
    {
        public required string Usuario_Id { get; set; }
        public required string Nome { get; set; }
    }

    public class UsuarioDto
    {
        public string? Usuario_Id { get; set; }
        public required string Nome { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Tiktok { get; set; } = string.Empty;
        public string Outras { get; set; } = string.Empty;
        public IEnumerable<MedicacaoDto>? Medicacoes { get; set; }
        public IEnumerable<RefeicaoDto>? Refeicoes { get; set; }
    }

    public partial class MedicacaoDto
    {
        public string? Medicacao_Id { get; set; }
        public required string Nome { get; set; }
        public required string Dose { get; set; }
        public int VezesAoDia { get; set; }
        public int VezesNaSemana { get; set; }
    }

    public partial class RefeicaoDto
    {
        public string? Refeicao_Id { get; set; }
        public required string Nome { get; set; }
        public IEnumerable<Alimento>? Alimentos { get; set; }
    }

}
