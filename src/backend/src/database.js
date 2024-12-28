import {Sequelize, DataTypes} from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:password@db:5432/db_gym');

sequelize.authenticate()
  .then(() => console.log('Conexión establecida correctamente.'))
  .catch(err => console.error('No se pudo conectar a la base de datos:', err));

// Exportación de la tabla Usuarios
export const User = sequelize.define('usuarios', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: DataTypes.STRING(100),
  apellido: DataTypes.STRING(100),
  email: { type: DataTypes.STRING(150), unique: true, allowNull: false },
  contraseña: DataTypes.STRING(255),
  rol: DataTypes.ENUM('administrador', 'entrenador', 'cliente'),
  fecha_registro: DataTypes.DATE,
  estado: DataTypes.BOOLEAN
}, {
  freezeTableName: true,
  timestamps: false
});

// Exportación de la tabla Planes
export const Plan = sequelize.define('planes', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: DataTypes.STRING(100),
  precio: DataTypes.DECIMAL(10, 2),
  duracion: DataTypes.INTEGER, // Duración en meses
  descripcion: DataTypes.TEXT,
}, {
  freezeTableName: true,
  timestamps: false,
});

// Exportación de la tabla Membresías
export const Membresias = sequelize.define('membresias', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  usuario_id: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
  plan_id: { type: DataTypes.INTEGER, references: { model: Plan, key: 'id' } },
  fecha_inicio: DataTypes.DATE,
  fecha_fin: DataTypes.DATE,
  estado: DataTypes.BOOLEAN,
}, {
  freezeTableName: true,
  timestamps: false,
});

// Exportación de la tabla Entrenadores
export const Entrenador = sequelize.define('entrenadores', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  usuario_id: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
  especialidad: DataTypes.STRING(100),
  calificacion: DataTypes.DECIMAL(3, 2),
});

// Exportación de la tabla Ejercicios
export const Ejercicio = sequelize.define('ejercicios', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: DataTypes.STRING(100),
  musculo_objetivo: DataTypes.STRING(100),
  descripcion: DataTypes.TEXT,
  nivel_dificultad: DataTypes.ENUM('basico', 'intermedio', 'avanzado'),
});

// Exportación de la tabla Rutinas
export const Rutina = sequelize.define('rutinas', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  usuario_id: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
  entrenador_id: { type: DataTypes.INTEGER, references: { model: Entrenador, key: 'id' } },
  nombre: DataTypes.STRING(100),
  objetivo: DataTypes.TEXT,
  fecha_creacion: DataTypes.DATE,
});

// Exportación de la tabla Rutinas_Ejercicios
export const RutinaEjercicio = sequelize.define('rutinas_Ejercicios', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rutina_id: { type: DataTypes.INTEGER, references: { model: Rutina, key: 'id' } },
  ejercicio_id: { type: DataTypes.INTEGER, references: { model: Ejercicio, key: 'id' } },
  repeticiones: DataTypes.INTEGER,
  series: DataTypes.INTEGER,
});

// Exportación de la tabla Progreso
export const Progreso = sequelize.define('progreso', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  usuario_id: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
  peso: DataTypes.DECIMAL(5, 2),
  porcentaje_grasa: DataTypes.DECIMAL(5, 2),
  fecha: DataTypes.DATE,
});

// Exportación de la tabla Asistencias
export const Asistencia = sequelize.define('asistencias', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  usuario_id: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
  fecha: DataTypes.DATE,
  estado: DataTypes.ENUM('presente', 'ausente'),
}, {
  timestamps: false,
});

