import express from 'express';
import {Asistencia, Ejercicio, Rutina, RutinaEjercicio, Progreso, Plan, Membresias, Entrenador, User} from './database.js';
import cors from 'cors'
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Ruta principal
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Obtener todos los usuarios
app.get('/get-usuarios', async (req, res) => {
  let allUsers = await User.findAll();
  allUsers = allUsers.map((user) => user.toJSON());
  res.send(allUsers);
});

// Obtener un usuario por ID
app.get('/get-usuarios/:id', async (req, res) => {
  const id = req.params.id;
  let user = await User.findByPk(id);
  if (!user) {
    res.status(404).send('Usuario no encontrado.');
    return;
  }
  res.send(user.toJSON());
});

// Crear un usuario
app.post('/create-usuario', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).send(newUser.toJSON());
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Obtener todas las asistencias
app.get('/get-asistencias', async (req, res) => {
  const asistencias = await Asistencia.findAll();
  res.send(asistencias.map((asistencia) => asistencia.toJSON()));
});

// Crear una asistencia
app.post('/create-asistencia', async (req, res) => {
  try {
    const newAsistencia = await Asistencia.create(req.body);
    res.status(201).send(newAsistencia.toJSON());
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Obtener todos los ejercicios
app.get('/get-ejercicios', async (req, res) => {
  const ejercicios = await Ejercicio.findAll();
  res.send(ejercicios.map((ejercicio) => ejercicio.toJSON()));
});

// Crear un ejercicio
app.post('/create-ejercicio', async (req, res) => {
  try {
    const newEjercicio = await Ejercicio.create(req.body);
    res.status(201).send(newEjercicio.toJSON());
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Obtener todas las rutinas
app.get('/get-rutinas', async (req, res) => {
  const rutinas = await Rutina.findAll();
  res.send(rutinas.map((rutina) => rutina.toJSON()));
});

// Crear una rutina
app.post('/create-rutina', async (req, res) => {
  try {
    const newRutina = await Rutina.create(req.body);
    res.status(201).send(newRutina.toJSON());
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Obtener todos los planes
app.get('/get-planes', async (req, res) => {
  const planes = await Plan.findAll();
  res.send(planes.map((plan) => plan.toJSON()));
});

// Crear un plan
app.post('/create-plan', async (req, res) => {
  try {
    const newPlan = await Plan.create(req.body);
    res.status(201).send(newPlan.toJSON());
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Obtener todas las membresías
app.get('/get-membresias', async (req, res) => {
  const membresias = await Membresias.findAll();
  res.send(membresias.map((membresia) => membresia.toJSON()));
});

// Crear una membresía
app.post('/create-membresia', async (req, res) => {
  try {
    const newMembresia = await Membresia.create(req.body);
    res.status(201).send(newMembresia.toJSON());
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Obtener todos los entrenadores
app.get('/get-entrenadores', async (req, res) => {
  const entrenadores = await Entrenador.findAll();
  res.send(entrenadores.map((entrenador) => entrenador.toJSON()))
})

// Crear una entrenador
app.post('/create-entrenador', async (req, res) => {
  try {
    const newEntrenador = await Entrenador.create(req.body);
    res.status(201).send(newEntrenador.toJSON());
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Obtener todas los progresos
app.get('/get-progresos', async (req, res) => {
  const progresos = await Progreso.findAll()
  res.send(progresos.map((progreso) => progreso.toJSON()))
})

// Crear un progreso
app.post('/create-progreso', async (req, res) => {
  try {
    const newProgreso = await Progreso.create(req.body);
    res.status(201).send(newProgreso.toJSON());
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
