# Backend NestJS - Task API

Este backend implementa la API REST de **Task** usando **NestJS** y **TypeORM**.  
Permite gestionar tareas con operaciones de alta, consulta, edición parcial, borrado lógico y restauración.

---

## 📌 Endpoints disponibles

| Método | URL | Descripción |
|--------|-----------------------------|------------------------------------|
| GET    | `/task/`                    | Listar todas las tareas (findAll)  |
| GET    | `/task/<int:pk>/`           | Obtener una tarea por ID (findOne) |
| POST   | `/task/`                    | Crear una nueva tarea (create)     |
| PATCH  | `/task/update/<int:pk>/`    | Actualizar parcialmente una tarea (update parcial) |
| DELETE | `/task/remove/<int:pk>/`    | Eliminar lógicamente una tarea (remove) |
| PATCH  | `/task/restore/<int:pk>/`   | Restaurar una tarea eliminada (restore) |

---

## ⚙️ Instalación

### 1. Clonar solo este backend

Si solo quieres el backend NestJS, clona directamente este repositorio:

```bash
git clone https://github.com/devsys-bit/bck-nestjs.git
cd bck-nestjs
```

---

### 2. Instalar dependencias

```bash
npm install
```

---

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz de `bck-nestjs` con el siguiente contenido (ajusta los valores según tu configuración):

```
USER_DB=tu_usuario
PASSWORD_DB=tu_contraseña
HOST_DB=tu_host
PORT_DB=tu_puerto
NAME_DB=tu_base_datos
```

> ⚠️ **Este backend está configurado para usar PostgreSQL como base de datos.**  
> Si quieres usar otro motor, ajusta la configuración en el módulo de conexión de TypeORM.

---

### 4. Ejecutar servidor

```bash
npm run start:dev
```

La API estará disponible en:  
👉 `http://localhost:3000`

---

### 5. Documentación API

Puedes acceder a la documentación interactiva Swagger en:  
👉 `http://localhost:3000/api`

---

## 📌 Notas

- El backend usa **PostgreSQL** como base de datos por defecto.
- El borrado es **lógico**: las tareas no se eliminan físicamente, solo se marca la fecha en `deleted_at`.
- El endpoint `/task/restore/<int:pk>/` permite reactivar tareas eliminadas.

---

## ✍️ Autor

**DERLYS DANIEL ALVARADO MENDOZA**  
Desarrollador Web Full Stack