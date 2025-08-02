# Notes App – Full Stack Implementation

This project is a full-stack web application that allows you to create, edit, delete, and archive notes, as well as categorize and filter them by category. It meets the requirements of the technical exercise requested by Ensolvers.

---

## ⛔ IMPORTANT
To use the script start.sh we need:
- 1.Install PostgreSQL : Download and install it from https://www.postgresql.org/download
    - password: admin
    - port: 5432
    - unchecked Stack Builder 
- 2.Locate bin folder path
    example : C:\Program Files\PostgreSQL\17\bin
- 3.Add psql to your system PATH
    - -> Open the Start Menu and search: Edit the system environment variables
    - -> Click on Environment Variables
    - -> Under System variables, select PATH and click Edit , Click New, and paste the path to the bin folder. 
    - -> Confirm all dialogs with OK.
    - -> Close Visual Studio or any terminal if it was open.
- 4.Verify in Git Bash
    ```bash
    psql --version 
If it shows a version number, it’s correctly set. If not, try restarting your PC or repeat the steps.

- 5.Run the project -> In the root directory of the project, Git Bash:
    ```bash
    chmod +x start.sh
    ./start.sh


## 📝 Login
Simulated login credentials:
- **User**: Hirelens
- **Password**: admin

## Technologies used

### 🖥️ Frontend

- **Framework**: [Next.js](https://nextjs.org/) (SPA)
- **Language**: TypeScript and Javascript
- **Style**: Tailwind CSS
- **Performance**: `next/image`, optimización automática
- **State management and hooks**: React hooks
- **Frontend dependencies**:
    - `framer-motion` – animations
    - `next`, `react`, `react-dom` – base framework
    - `tailwindcss` – utility-first CSS

### 🛠️ Backend

- **Framework**: ASP.NET Core 8
- **Language**: C#
- **ORM**: Entity Framework Core
- **Database**: PostgreSQL (with initial SQL file in `/database/bbdd.sql`)
- **Main Dependencies**:
    - `Npgsql.EntityFrameworkCore.PostgreSQL` – PostgreSQL provider for EF Core
    - `Microsoft.EntityFrameworkCore.Design` – EF migrations & scaffolding
    - `Microsoft.AspNetCore.Mvc` – Controllers and routing

### ⛓ Project Structure
```bash
   .  
    ├── database/  
    │   └── bbdd.sql # PostgreSQL database creation script  
    ├── backend/  
    │   ├── BackendDbContext.cs  
    │   ├── Data/  
    │   │   └── Service/  
    │   └── Features/  
    │       ├── Categorias/  
    │       │   ├── Controller/  
    │       │   ├── Dtos/  
    │       │   ├── Models/  
    │       │   └── Service/  
    │       ├── NotaCategorias/  
    │       │   ├── Controller/  
    │       │   ├── Dtos/  
    │       │   ├── Models/  
    │       │   └── Service/  
    │       └── Notas/  
    │           ├── Controller/  
    │           ├── Dtos/  
    │           ├── Models/  
    │           └── Service/  
    ├── frontend/  
    │   ├── app/  
    │   ├── components/  
    │   ├── services/  
    │   ├── types/  
    │   └── utils/  
    └── start.sh # Startup script for the entire project  
```

## Features Implemented
### Phase 1 (mandatory):
- ✅ As a user, I want to be able to create, edit, and delete notes.
- ✅ As a user, I want to archive/unarchive notes.
- ✅ As a user, I want to list my active notes.
- ✅ As a user, I want to list my archived notes.

### Phase 2 (extra):
- ✅ As a user, I want to be able to add/remove categories to notes.
- ✅ As a user, I want to be able to filter notes by category.

## How to build the project
- **1**: Run the startup script:
    ```bash
    chmod +x start.sh
    ./start.sh


This will run:
- Backend in http://localhost:5000
- Frontend in http://localhost:3000

### 🌐 important URLs 
Frontend: http://localhost:3000  
API backend swagger to test endpoints: http://localhost:5000/swagger/index.html  
API backend: http://localhost:5000/api/  


