using Microsoft.EntityFrameworkCore;
using Backend.Data;

namespace Backend.Data
{
    public class HealthService
    {
        private readonly BackendDbContext _context;

        public HealthService(BackendDbContext context)
        {
            _context = context;
        }

        public async Task<bool> CanConnectAsync()
        {
            return await _context.Database.CanConnectAsync();
        }
    }
}