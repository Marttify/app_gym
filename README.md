# App Gym

Este es un proyecto de ejemplo para un sistema de gestión de gimnasio. El frontend actualmente no tiene funcionalidades interactivas, pero permite visualizar las rutas a través de las URL (endpoints).

## Características

- El frontend solo muestra las rutas disponibles en el sistema.
- No tiene funcionalidades dinámicas ni interacción con el usuario.

## Endpoints

Las siguientes rutas están disponibles en el sistema:

- `/`: **Página principal.** Proporciona una visión general del sistema de gestión del gimnasio y sus funcionalidades básicas.  
- `/usuarios`: **Listado de usuarios.** Muestra información detallada sobre los usuarios registrados, incluyendo sus roles, estados y fechas de registro.  
- `/planes`: **Gestión de planes.** Proporciona información sobre los planes disponibles, incluyendo precio, duración y descripción.  
- `/asistencias`: **Registro de asistencias.** Permite visualizar y gestionar el historial de asistencias de los usuarios, indicando fechas y estados (presente/ausente).  
- `/ejercicios`: **Base de datos de ejercicios.** Lista los ejercicios disponibles, detallando el músculo objetivo, nivel de dificultad y descripción del ejercicio.  
- `/entrenadores`: **Gestión de entrenadores.** Muestra información sobre los entrenadores registrados, incluyendo especialidades y calificaciones.  
- `/membresias`: **Administración de membresías.** Detalla las membresías activas, con información sobre los usuarios asociados, fechas de inicio y fin, así como el estado de la membresía.  
- `/progreso`: **Seguimiento del progreso.** Permite visualizar métricas de progreso físico de los usuarios, como peso, porcentaje de grasa corporal y fecha de registro.  
- `/rutinas`: **Gestión de rutinas.** Muestra información sobre las rutinas asignadas a los usuarios, incluyendo objetivos, entrenadores responsables y fechas de creación.  
- `/rutinas_ejercicios`: **Relación entre rutinas y ejercicios.** Detalla los ejercicios asignados a cada rutina, incluyendo repeticiones y series asociadas.  

## Tecnologías utilizadas

### Backend

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express.js**: Framework para crear las rutas y gestionar las solicitudes HTTP.
- **PostgreSQL**: Base de datos relacional utilizada para almacenar la información.
- **Sequelize**: ORM utilizado para interactuar con la base de datos PostgreSQL.
- **bodyParser**: Middleware para analizar el cuerpo de las solicitudes HTTP.
- **Docker**: Herramienta para contenedores que permite ejecutar el proyecto de manera aislada y uniforme en cualquier entorno.

### Frontend

- **React**: Biblioteca para construir interfaces de usuario.
- **axios**: Cliente HTTP para interactuar con el backend y obtener datos.
- **Tailwind CSS**: Herramienta de utilidad para estilizar la interfaz.
- **shadcn/ui**: Librería para construir componentes de interfaz de usuario reutilizables y consistentes.

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/Marttify/app_gym.git
   ```

2. Navega a la carpeta del proyecto:

   ```bash
   cd app_gym
   ```

3. Construye los contenedores de Docker y ejecuta el proyecto:

   ```bash
   docker-compose up --build
   ```

   Esto levantará tanto el backend como el frontend, y podrás acceder a la aplicación desde tu navegador en `http://localhost:3000`.


## Contribuciones

Si deseas contribuir, por favor haz un fork del repositorio y crea un pull request con tus cambios.

