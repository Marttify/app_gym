import express from 'express';
import {Asistencia, Ejercicio, Rutina, RutinaEjercicio, Progreso, Plan, Membresias, User, Entrenadores} from './database.js';
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


////////////////////////////////////usuarios////////////////////////////////////////////
// Obtener todos los usuarios
app.get('/get-usuarios', async (req, res) => {
  let allUsers = await User.findAll();
  allUsers = allUsers.map((user) => user.toJSON());
  res.send(allUsers);
});
// Obtener un usuario por ID
app.get('/get-usuario/:id', async (req, res) => {
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
// Eliminar todos los usuarios
app.delete('/delete-usuarios', async (req, res) => {
  try {
    const result = await User.destroy({
      where: {},
      force: true,
    });

    if (result === 0) {
      return res.status(404).json({ message: 'No se encontraron usuarios para eliminar.' });
    }

    res.status(200).json({ message: `Se eliminaron ${result} usuarios correctamente.` });
  } catch (error) {
    console.error('Error al eliminar los usuarios:', error.message);
    res.status(500).json({ error: 'Hubo un problema al eliminar los usuarios.' });
  }
});

// Eliminar un usuario por ID
app.delete('/delete-usuario/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).send('Usuario no encontrado.');
      return;
    }

    await user.destroy();
    res.send({ message: 'Usuario eliminado correctamente.' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
// Actualizar un usuario por ID
app.put('/update-usuario/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).send('Usuario no encontrado.');
      return;
    }

    // Actualiza el usuario con los datos enviados en el cuerpo de la petición
    await user.update(req.body);

    res.send(user.toJSON());
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});







////////////////////////////////////Asistencias////////////////////////////////////////////
// Obtener todas las asistencias
app.get('/get-asistencias', async (req, res) => {
  const asistencias = await Asistencia.findAll();
  res.send(asistencias.map((asistencia) => asistencia.toJSON()));
});
// Obtener la asistencia por ID
app.get('/get-asistencia/:id', async (req, res) => {
  const id = req.params.id;
  let asistencia = await Asistencia.findByPk(id);
  if (!asistencia) {
    res.status(404).send('Asistencia no encontrada.');
    return;
  }
  res.send(asistencia.toJSON());
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
// Eliminar la asistencia por ID
app.delete('/delete-asistencia/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const asistencia = await Asistencia.findByPk(id);
    if (!asistencia) {
      res.status(404).send('Asistencia no encontrada.');
      return;
    }

    await asistencia.destroy();
    res.send({ message: 'Asistencia eliminada correctamente.' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
// Actualizar la asistencia por ID
app.put('/update-asistencia/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const asistencia = await Asistencia.findByPk(id);

    if (!asistencia) {
      res.status(404).send('Asistencia no encontrada.');
      return;
    }

    // Actualiza la asistencia con los datos enviados en el cuerpo de la petición
    await asistencia.update(req.body);

    res.send(asistencia.toJSON());
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});







////////////////////////////////////Ejercicios////////////////////////////////////////////
// Obtener todos los ejercicios
app.get('/get-ejercicios', async (req, res) => {
  const ejercicios = await Ejercicio.findAll();
  res.send(ejercicios.map((ejercicio) => ejercicio.toJSON()));
});
// Obtener el ejercicio por ID
app.get('/get-ejercicio/:id', async (req, res) => {
  const id = req.params.id;
  let ejercicio = await Ejercicio.findByPk(id);
  if (!ejercicio) {
    res.status(404).send('Ejercicio no encontrada.');
    return;
  }
  res.send(ejercicio.toJSON());
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
// Eliminar el ejercicio por ID
app.delete('/delete-ejercicio/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const ejercicio = await Ejercicio.findByPk(id);
    if (!ejercicio) {
      res.status(404).send('Ejercicio no encontrado.');
      return;
    }

    await ejercicio.destroy();
    res.send({ message: 'Ejercicio eliminado correctamente.' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
// Actualizar la ejercicio por ID
app.put('/update-ejercicio/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const ejercicio = await Ejercicio.findByPk(id);

    if (!ejercicio) {
      res.status(404).send('Ejercicio no encontrada.');
      return;
    }

    // Actualiza la ejercicio con los datos enviados en el cuerpo de la petición
    await ejercicio.update(req.body);

    res.send(ejercicio.toJSON());
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});







////////////////////////////////////Rutinas////////////////////////////////////////////
// Obtener todas las rutinas
app.get('/get-rutinas', async (req, res) => {
  const rutinas = await Rutina.findAll();
  res.send(rutinas.map((rutina) => rutina.toJSON()));
});
// Obtener el rutina por ID
app.get('/get-rutina/:id', async (req, res) => {
  const id = req.params.id;
  let rutina = await Rutina.findByPk(id);
  if (!rutina) {
    res.status(404).send('Rutina no encontrada.');
    return;
  }
  res.send(rutina.toJSON());
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
// Eliminar la rutina por ID
app.delete('/delete-rutina/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const rutina = await Rutina.findByPk(id);
    if (!rutina) {
      res.status(404).send('Rutina no encontrada.');
      return;
    }

    await rutina.destroy();
    res.send({ message: 'Rutina eliminada correctamente.' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
// Actualizar la asistencia por ID
app.put('/update-rutina/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const rutina = await Rutina.findByPk(id);

    if (!rutina) {
      res.status(404).send('Rutina no encontrada.');
      return;
    }

    // Actualiza la rutina con los datos enviados en el cuerpo de la petición
    await rutina.update(req.body);

    res.send(rutina.toJSON());
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});







////////////////////////////////////Planes////////////////////////////////////////////
// // Obtener todos los planes
app.get('/get-planes', async (req, res) => {
  const planes = await Plan.findAll();
  res.send(planes.map((plan) => plan.toJSON()));
});
// Obtener el plan por ID
app.get('/get-plan/:id', async (req, res) => {
  const id = req.params.id;
  let planes = await Plan.findByPk(id);
  if (!planes) {
    res.status(404).send('Planes no encontrados.');
    return;
  }
  res.send(planes.toJSON());
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
// Actualizar un plan por ID
app.put('/update-plan/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const plan = await Plan.findByPk(id);

    if (!plan) {
      res.status(404).send('Plan no encontrado.');
      return;
    }

    // Actualiza el plan con los datos enviados en el cuerpo de la petición
    await plan.update(req.body);

    res.send(plan.toJSON());
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
// Eliminar un plan por ID
app.delete('/delete-plan/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const plan = await Plan.findByPk(id);
    if (!plan) {
      res.status(404).send('Plan no encontrado.');
      return;
    }

    await plan.destroy();
    res.send({ message: 'Plan eliminado correctamente.' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});







////////////////////////////////////Membresías////////////////////////////////////////////
// Obtener todas las membresías
app.get('/get-membresias', async (req, res) => {
  const membresias = await Membresias.findAll();
  res.send(membresias.map((membresia) => membresia.toJSON()));
});
// Obtener la membresía por ID
app.get('/get-membresías/:id', async (req, res) => {
  const id = req.params.id;
  let membresias = await Membresias.findByPk(id);
  if (!membresias) {
    res.status(404).send('Membresias no encontrados.');
    return;
  }
  res.send(membresias.toJSON());
});
// Crear una membresía
app.post('/create-membresia', async (req, res) => {
  try {
    const newMembresia = await Membresias.create(req.body);
    res.status(201).send(newMembresia.toJSON());
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
// Actualizar la membresia por ID
app.put('/update-membresia/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const membresia = await Membresias.findByPk(id);

    if (!membresia) {
      res.status(404).send('Membresia no encontrada.');
      return;
    }

    // Actualiza el membresia con los datos enviados en el cuerpo de la petición
    await membresia.update(req.body);

    res.send(membresia.toJSON());
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
// Eliminar una membresia por ID
app.delete('/delete-membresia/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const membresia = await Membresias.findByPk(id);
    if (!membresia) {
      res.status(404).send('Membresia no encontrada.');
      return;
    }

    await membresia.destroy();
    res.send({ message: 'Membresia eliminada correctamente.' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});







////////////////////////////////////Entrenadores////////////////////////////////////////////
// Obtener todos los entrenadores
app.get('/get-entrenadores', async (req, res) => {
  const entrenadores = await Entrenadores.findAll();
  res.send(entrenadores.map((entrenador) => entrenador.toJSON()))
})
// Obtener el entrenador por ID
app.get('/get-entrenador/:id', async (req, res) => {
  const id = req.params.id;
  let entrenador = await Entrenadores.findByPk(id);
  if (!entrenador) {
    res.status(404).send('Entrenador no encontrados.');
    return;
  }
  res.send(entrenador.toJSON());
});
// Crear una entrenador
app.post('/create-entrenador', async (req, res) => {
  try {
    const newEntrenador = await Entrenadores.create(req.body);
    res.status(201).send(newEntrenador.toJSON());
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
// Actualizar el entrenador por ID
app.put('/update-entrenador/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const entrenador = await Entrenadores.findByPk(id);

    if (!entrenador) {
      res.status(404).send('Entrenador no encontrada.');
      return;
    }

    // Actualiza el entrenador con los datos enviados en el cuerpo de la petición
    await entrenador.update(req.body);

    res.send(entrenador.toJSON());
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
// Eliminar el entrenador por ID
app.delete('/delete-entrenador/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const entrenador = await Entrenadores.findByPk(id);
    if (!entrenador) {
      res.status(404).send('Entrenador no encontrada.');
      return;
    }

    await entrenador.destroy();
    res.send({ message: 'Entrenador eliminada correctamente.' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});







////////////////////////////////////Progresos////////////////////////////////////////////
// Obtener todas los progresos
app.get('/get-progresos', async (req, res) => {
  const progresos = await Progreso.findAll()
  res.send(progresos.map((progreso) => progreso.toJSON()))
})
// Obtener el progreso por ID
app.get('/get-progreso/:id', async (req, res) => {
  const id = req.params.id;
  let progreso = await Progreso.findByPk(id);
  if (!progreso) {
    res.status(404).send('Progreso no encontrados.');
    return;
  }
  res.send(progreso.toJSON());
});
// Crear un progreso
app.post('/create-progreso', async (req, res) => {
  try {
    const newProgreso = await Progreso.create(req.body);
    res.status(201).send(newProgreso.toJSON());
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
// Actualizar el progreso por ID
app.put('/update-progreso/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const progreso = await Progreso.findByPk(id);

    if (!progreso) {
      res.status(404).send('Progreso no encontrada.');
      return;
    }

    // Actualiza el progreso con los datos enviados en el cuerpo de la petición
    await progreso.update(req.body);

    res.send(progreso.toJSON());
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
// Eliminar el entrenador por ID
app.delete('/delete-progreso/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const progreso = await Progreso.findByPk(id);
    if (!progreso) {
      res.status(404).send('Progreso no encontrada.');
      return;
    }

    await progreso.destroy();
    res.send({ message: 'Progreso eliminada correctamente.' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});







// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
