# 📌 Backend NestJS - Task API

Backend RESTful para la gestión de **tareas** construido con **NestJS** y **TypeORM**, optimizado para alto rendimiento usando **Fastify**.  
Incluye operaciones de creación, consulta, actualización parcial, eliminación lógica y restauración.

---

## 🚀 Endpoints disponibles

| Método | URL | Descripción |
|--------|------------------------------|--------------------------------------------|
| GET    | `/task/`                     | Listar todas las tareas (findAll)          |
| GET    | `/task/<int:pk>/`            | Obtener una tarea por ID (findOne)         |
| POST   | `/task/`                     | Crear una nueva tarea (create)             |
| PATCH  | `/task/update/<int:pk>/`     | Actualizar parcialmente una tarea          |
| DELETE | `/task/remove/<int:pk>/`     | Eliminar lógicamente una tarea (soft delete)|
| PATCH  | `/task/restore/<int:pk>/`    | Restaurar una tarea eliminada              |

---

## ⚙️ Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/devsys-bit/bck-nestjs.git
cd bck-nestjs
```

### 2. Instalar dependencias

```bash
npm install
```

📦 **Dependencias principales**:

- **Core NestJS y configuración**
  - `@nestjs/config` → Gestión de variables de entorno.
  - `@nestjs/typeorm` y `typeorm` → ORM para bases de datos SQL.

- **Drivers de base de datos** (elige uno según tu preferencia):
  - `pg` → Driver para PostgreSQL.
  - `mysql2` → Driver para MySQL/MariaDB.

- **Validación y transformación**
  - `class-validator` → Validación de datos.
  - `class-transformer` → Transformación de objetos.

- **Servidor HTTP con Fastify**
  - `@nestjs/platform-fastify` y `fastify` → Servidor rápido y optimizado.
  - `@fastify/static` → Servir archivos estáticos.

- **Documentación**
  - `@nestjs/swagger` y `fastify-swagger` → Documentación interactiva con Swagger.

- **Utilidades**
  - `nestjs-paginate` → Paginación de resultados.

---

### 3. Variables de entorno

Crea un archivo `.env` con:

```env
USER_DB=tu_usuario
PASSWORD_DB=tu_contraseña
HOST_DB=tu_host
PORT_DB=tu_puerto
NAME_DB=tu_base_datos
```

> Puedes configurar para **PostgreSQL** o **MySQL** editando la conexión de TypeORM.

---

### 4. Ejecutar servidor en desarrollo

```bash
npm run start:dev
```

API:  
👉 `http://localhost:3000`

Swagger:  
👉 `http://localhost:3000/api`

---

## 🗒️ Notas técnicas

- **Borrado lógico** con campo `deleted_at`.
- Restauración de tareas vía `/task/restore/<id>`.
- Soporte de paginación y validación de datos.
- Servido con **Fastify** y soporte para **archivos estáticos**.

---

## ✍️ Autor

**DERLYS DANIEL ALVARADO MENDOZA**  
*Desarrollador Web Full Stack*
