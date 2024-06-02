using MongoDB.Bson;

namespace backend.Models
{
    public partial class Usuario
    {
        public ObjectId Id { get; set; }
        public required string Usuario_Id { get; set; }
        public required string Nome { get; set; }
        public required string Email { get; set; }
        public string Tiktok { get; set; } = string.Empty;
        public string Outras { get; set; } = string.Empty;
    }

    public partial class Medicacao
    {
        public ObjectId Id { get; set; }
        public required string Medicacao_Id { get; set; }
        public required string Nome { get; set; }
        public required string Dose { get; set; }
        public int VezesAoDia { get; set; }
        public int VezesNaSemana { get; set; }
        public required string Usuario_Id { get; set; }
    }

    public partial class Refeicao
    {
        public ObjectId Id { get; set; }
        public required string Refeicao_Id { get; set; }
        public required string Nome { get; set; }
        public required string Usuario_Id { get; set; }
        public IEnumerable<Alimento>? Alimentos { get; set; }
    }

    public class Alimento
    {
        public int Alimento_Id { get; set; }
        public required string Nome { get; set; }
        public double Grama { get; set; }
        public double Kcal { get; set; }
        public double Carboidrato { get; set; }
        public double Proteina { get; set;}
        public double Gordura { get; set;}
        public double Fibra { get; set;}
    }
}