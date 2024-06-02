using AutoMapper;
using backend.Data;
using backend.Dtos;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class MedicacaoRepository(DataContext dataContext) : IMedicacaoRepository
    {
        private readonly DataContext _entityMongo = dataContext;

        private readonly Mapper _mapper = new(new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<Medicacao, MedicacaoDto>().ReverseMap();
        }));

        public async Task<bool> Delete(string userId, IEnumerable<MedicacaoDto> medicacao)
        {
            await Task.Run(async () =>
            {
                foreach (var med in medicacao)
                {
                    var medicacaoDb = await _entityMongo.Medicacoes.FirstOrDefaultAsync(m => m.Medicacao_Id == med.Medicacao_Id && m.Usuario_Id == userId);

                    if (medicacaoDb != null)
                    {
                        _entityMongo.Medicacoes.Remove(medicacaoDb);

                        if (await _entityMongo.SaveChangesAsync() == 0)
                        {
                            throw new Exception("Erro apagar");
                        }
                    }
                }
            });

            return true;
        }

        public async Task<IEnumerable<MedicacaoDto>> Get(string email)
        {
            return _mapper.Map<IEnumerable<MedicacaoDto>>(await _entityMongo.Medicacoes.Where(m => m.Usuario_Id == email).ToListAsync());
        }

        public async Task<bool> Post(IEnumerable<MedicacaoDto> dto, string userId)
        {
            await Task.Run(async () =>
            {
                foreach (var med in dto)
                {
                    Medicacao medicacaoNova = new()
                    {
                        Medicacao_Id = Guid.NewGuid().ToString(),
                        Nome = med.Nome,
                        Dose = med.Dose,
                        VezesAoDia = med.VezesAoDia,
                        VezesNaSemana = med.VezesNaSemana,
                        Usuario_Id = userId
                    };

                    await _entityMongo.AddAsync(medicacaoNova);

                    await _entityMongo.SaveChangesAsync();
                }
            });

            return true;
        }

        public async Task<bool> Put(IEnumerable<MedicacaoDto> dto, string userId)
        {
            await Task.Run(async () =>
            {
                foreach (var med in dto)
                {
                    Medicacao? medicacaoDb = await _entityMongo.Medicacoes.FirstOrDefaultAsync(m => m.Medicacao_Id == med.Medicacao_Id && m.Usuario_Id == userId);

                    if (medicacaoDb != null)
                    {
                        medicacaoDb.Nome = med.Nome;
                        medicacaoDb.Dose = med.Dose;
                        medicacaoDb.VezesAoDia = med.VezesAoDia;
                        medicacaoDb.VezesNaSemana = med.VezesNaSemana;

                        await _entityMongo.SaveChangesAsync();
                    }
                    else
                    {
                        Medicacao medicacaoNova = new()
                        {
                            Medicacao_Id = Guid.NewGuid().ToString(),
                            Nome = med.Nome,
                            Dose = med.Dose,
                            VezesAoDia = med.VezesAoDia,
                            VezesNaSemana = med.VezesNaSemana,
                            Usuario_Id = userId
                        };

                        await _entityMongo.AddAsync(medicacaoNova);

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
