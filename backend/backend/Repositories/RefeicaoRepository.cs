using AutoMapper;
using backend.Data;
using backend.Dtos;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace backend.Repositories
{
    public class RefeicaoRepository(DataContext dataContext) : IRefeicaoRepository
    {
        private readonly DataContext _entityMongo = dataContext;
        private readonly Mapper _mapper = new(new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<Refeicao, RefeicaoDto>().ReverseMap();
        }));


        public async Task<bool> Delete(string refeicaoId, string userId)
        {
            var refeicaoDb = await _entityMongo.Refeicoes.FirstOrDefaultAsync(m => m.Usuario_Id == userId);

            if (refeicaoDb != null)
            {
                _entityMongo.Refeicoes.Remove(refeicaoDb);

                if (await _entityMongo.SaveChangesAsync() > 0)
                {
                    return true;
                }
            }

            return false;
        }

        public async Task<IEnumerable<RefeicaoDto>> GetAll(string userId)
        {
            return _mapper.Map<IEnumerable<RefeicaoDto>>(await _entityMongo.Refeicoes.Where(r => r.Usuario_Id == userId).ToListAsync());
        }

        public async Task<bool> Post(RefeicaoDto refeicaodto, string userId)
        {
            Refeicao refeicaoNova = new()
            {
                Refeicao_Id = Guid.NewGuid().ToString(),
                Usuario_Id = userId,
                Nome = refeicaodto.Nome
            };

            await _entityMongo.Refeicoes.AddAsync(refeicaoNova);

            await _entityMongo.SaveChangesAsync();

            return true;
        }

        public async Task<bool> Put(IEnumerable<RefeicaoDto> refeicao, string userId)
        {
            await Task.Run(async () =>
            {
                foreach (var refe in refeicao)
                {
                    Refeicao? refeicaoDb = await _entityMongo.Refeicoes.FirstOrDefaultAsync(r => r.Usuario_Id == userId & r.Refeicao_Id == refe.Refeicao_Id);

                    if (refeicaoDb != null)
                    {
                        refeicaoDb.Alimentos = refe.Alimentos;

                        if (await _entityMongo.SaveChangesAsync() == 0)
                        {
                            throw new Exception("Error ao salvar");
                        }
                    }                    
                }
            });

            return true;
        }
    }
}
