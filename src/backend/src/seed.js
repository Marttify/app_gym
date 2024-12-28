import { sequelize } from './database.js';
import { User, Asistencia, Ejercicio, Rutina, RutinaEjercicio, Progreso, Plan, Membresia, Entrenador } from './database.js';

const seedData = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Base de datos sincronizada.');

    // Usuarios
    const users = await User.bulkCreate([
      { nombre: 'Juan', apellido: 'Perez', email: 'juan@example.com', contraseña: '123456', rol: 'cliente', fecha_registro: new Date(), estado: true },
      { nombre: 'Ana', apellido: 'Lopez', email: 'ana@example.com', contraseña: '123456', rol: 'entrenador', fecha_registro: new Date(), estado: true },
      { nombre: 'Carlos', apellido: 'Gomez', email: 'carlos@example.com', contraseña: '123456', rol: 'administrador', fecha_registro: new Date(), estado: true },
    ]);
    console.log('Usuarios creados.');

    // Planes
    const planes = await Plan.bulkCreate([
      { nombre: 'Básico', precio: 20.00, duracion: 1, descripcion: 'Acceso básico al gimnasio.' },
      { nombre: 'Premium', precio: 50.00, duracion: 3, descripcion: 'Acceso a todas las áreas y clases grupales.' },
    ]);
    console.log('Planes creados.');

    // Membresías
    const membresias = await Membresia.bulkCreate([
      { usuario_id: users[0].id, plan_id: planes[0].id, fecha_inicio: new Date(), fecha_fin: new Date(new Date().setMonth(new Date().getMonth() + 1)), estado: true },
      { usuario_id: users[1].id, plan_id: planes[1].id, fecha_inicio: new Date(), fecha_fin: new Date(new Date().setMonth(new Date().getMonth() + 3)), estado: true },
    ]);
    console.log('Membresías creadas.');

    // Entrenadores
    const entrenadores = await Entrenador.bulkCreate([
      { usuario_id: users[1].id, especialidad: 'Fuerza', calificacion: 4.5 },
    ]);
    console.log('Entrenadores creados.');

    // Ejercicios
    const ejercicios = await Ejercicio.bulkCreate([
      { nombre: 'Press de banca', musculo_objetivo: 'Pecho', descripcion: 'Ejercicio para fortalecer el pecho.', nivel_dificultad: 'intermedio' },
      { nombre: 'Sentadilla', musculo_objetivo: 'Piernas', descripcion: 'Ejercicio para fortalecer las piernas.', nivel_dificultad: 'intermedio' },
    ]);
    console.log('Ejercicios creados.');

    // Rutinas
    const rutinas = await Rutina.bulkCreate([
      { usuario_id: users[0].id, entrenador_id: entrenadores[0].id, nombre: 'Rutina Inicial', objetivo: 'Mejorar fuerza general.', fecha_creacion: new Date() },
    ]);
    console.log('Rutinas creadas.');

    // Rutinas_Ejercicios
    await RutinaEjercicio.bulkCreate([
      { rutina_id: rutinas[0].id, ejercicio_id: ejercicios[0].id, repeticiones: 10, series: 3 },
      { rutina_id: rutinas[0].id, ejercicio_id: ejercicios[1].id, repeticiones: 12, series: 3 },
    ]);
    console.log('Rutinas_Ejercicios creadas.');

    // Progreso
    await Progreso.bulkCreate([
      { usuario_id: users[0].id, peso: 70.5, porcentaje_grasa: 18.2, fecha: new Date() },
    ]);
    console.log('Progreso creado.');

    // Asistencias
    await Asistencia.bulkCreate([
      { usuario_id: users[0].id, fecha: new Date(), estado: 'presente' },
      { usuario_id: users[0].id, fecha: new Date(new Date().setDate(new Date().getDate() - 1)), estado: 'ausente' },
    ]);
    console.log('Asistencias creadas.');
  } catch (error) {
    console.error('Error al poblar la base de datos:', error.message);
  } finally {
    sequelize.close();
  }
};

seedData();
