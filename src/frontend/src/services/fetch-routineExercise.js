"use server"

import api from './api';
import data from './data.json';

export async function readRoutineExercise({setRoutineExercise}) {
  try {
    const response = await api.get('/get-rutinas_ejercicios');

    if (response.data && Array.isArray(response.data)) {
      setRoutineExercise(response.data);
    } else {
      console.warn('Datos de las R_E no válidos. Usando datos predeterminados.');
      setRoutineExercise(data.Rutinas_Ejercicios);
    }
  } catch (error) {
    console.error('Error fetching Rutinas_ejercicios:', error);
    setRoutineExercise(data.Rutinas_Ejercicios);
  }
};

export async function createRoutineExercise({data}) {
  try {
      const response = await api.post("/create-rutinas_ejercicio", data);
      console.log("R_E creado con éxito:", response.data);
  } catch (error) {
    console.error(`Error al crear el R_E:`, error);
  }
}

export async function updateRoutineExercise({ data, id}) {
  try {
    const response = await api.put(`/update-rutinas_ejercicio/${id}`, data);
    console.log("R_E actualizado con éxito:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el R_E:`, error);
  }
}

export async function deleteRoutineExercise({routineExercise, setRoutineExercise}) {
  try {
    const response = await api.delete(`/delete-rutinas_ejercicio/${routineExercise.id}`);
    if (response.status === 200) {
      console.log("R_E eliminado con éxito.");

      setRoutineExercise((prevRoutineExercise) => {
        const updatedRoutineExercise = prevRoutineExercise.filter((u) => u.id !== routineExercise.id);
        const reassignedRoutineExercise = updatedRoutineExercise.map((u, index) => ({
          ...u,
          id: index + 1,
        }));

        return reassignedRoutineExercise;
      });
    } else {
      console.error("Error al eliminar el R_E.");
    }
  } catch (error) {
    console.error("Hubo un error al intentar eliminar el R_E:", error);
  }
}