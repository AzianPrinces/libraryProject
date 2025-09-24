dotnet ef dbcontext scaffold "Server=ep-late-bonus-ab1b9b6y-pooler.eu-west-2.aws.neon.tech;DB=neondb;UID=neondb_owner;PWD=npg_xjq3Zks8pSiO;SslMode=require" Npgsql.EntityFrameworkCore.PostgreSQL \
  --project . \
  --context LibraryDbContext \
  --context-dir . \
  --output-dir Entities \
  --schema library \
  --no-onconfiguring \
  --force
