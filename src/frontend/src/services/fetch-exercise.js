"use server"

import api from './api';
import data from './data.json';

export async function readExercise ({setExercises}) {
  try {
    const response = await api.get('/get-ejercicios');

    if (response.data && Array.isArray(response.data)) {
      setExercises(response.data);
    } else {
      console.warn('Datos de los ejercicios no válidos. Usando datos predeterminados.');
      setExercises(data.Ejercicios);
    }
  } catch (error) {
    console.error('Error fetching ejercicios:', error);
    setExercises(data.Ejercicios);
  }
};

export async function createExercise({data}) {
  try {
      const response = await api.post("/create-ejercicio", data);
      console.log("Ejercicio creado con éxito:", response.data);
  } catch (error) {
    console.error(`Error al crear el ejercicio:`, error);
  }
}

export async function updateExercise({ data, id}) {
  try {
    const response = await api.put(`/update-ejercicio/${id}`, data);
    console.log("Ejercicio actualizado con éxito:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el ejercicio:`, error);
  }
}

export async function deleteExercise({exercise, setExercises}) {
  try {
    const response = await api.delete(`/delete-ejercicio/${exercise.id}`);
    if (response.status === 200) {
      console.log("Ejercicio eliminado con éxito.");

      setExercises((prevExercise) => {
        const updatedExercise = prevExercise.filter((u) => u.id !== exercise.id);
        const reassignedExercise = updatedExercise.map((u, index) => ({
          ...u,
          id: index + 1,
        }));

        return reassignedExercise;
      });
    } else {
      console.error("Error al eliminar el ejercicio.");
    }
  } catch (error) {
    console.error("Hubo un error al intentar eliminar el ejercicio:", error);
  }
}