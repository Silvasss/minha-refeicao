using AutoMapper;
using backend.Data;
using backend.Dtos;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class VisitanteRepository(DataContext dataContext) : IVisitanteRepository
    {
        private readonly DataContext _entityMongo = dataContext;

        private readonly Mapper _mapper = new(new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<Usuario, UsuarioDto>().ReverseMap();
            cfg.CreateMap<Usuario, IndexUsuarioDto>().ReverseMap();
            cfg.CreateMap<Medicacao, MedicacaoDto>().ReverseMap();
            cfg.CreateMap<Refeicao, RefeicaoDto>().ReverseMap();
        }));

        public async Task<IEnumerable<IndexUsuarioDto>> GetAll()
        {
            return _mapper.Map<IEnumerable<IndexUsuarioDto>>(await _entityMongo.Usuarios.ToListAsync());
        }

        public async Task<UsuarioDto> GetById(string id)
        {
            UsuarioDto visitanteDb = _mapper.Map<UsuarioDto>(await _entityMongo.Usuarios.FirstOrDefaultAsync(u => u.Usuario_Id == id));

            if (visitanteDb == null)
            {
                return visitanteDb;
            }

            visitanteDb.Email = "";

            visitanteDb.Medicacoes = _mapper.Map<IEnumerable<MedicacaoDto>>(await _entityMongo.Medicacoes.Where(m => m.Usuario_Id == id).ToListAsync());

            visitanteDb.Refeicoes = _mapper.Map<IEnumerable<RefeicaoDto>>(await _entityMongo.Refeicoes.Where(r => r.Usuario_Id == id).ToListAsync());
            
            return visitanteDb;
        }
    }
}
