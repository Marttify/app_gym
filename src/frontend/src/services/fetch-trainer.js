"use server"

import api from './api';
import data from './data.json';

export async function readTrainers ({setTrainers}) {
  try {
    const response = await api.get('/get-entrenadores');

    if (response.data && Array.isArray(response.data)) {
      setTrainers(response.data);
    } else {
      console.warn('Datos de los entrenadores no válidos. Usando datos predeterminados.');
      setTrainers(data.Entrenadores);
    }
  } catch (error) {
    console.error('Error fetching Entrenadores:', error);
    setTrainers(data.Entrenadores);
  }
};

export async function createTrainer({data}) {
  try {
      const response = await api.post("/create-entrenador", data);
      console.log("Entrenador creado con éxito:", response.data);
  } catch (error) {
    console.error(`Error al crear el entrenador:`, error);
  }
}

export async function updateTrainer({ data, id}) {
  try {
    const response = await api.put(`/update-entrenador/${id}`, data);
    console.log("Entrenador actualizado con éxito:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el entrenador:`, error);
  }
}

export async function deleteTrainer({Trainer, setTrainers}) {
  try {
    const response = await api.delete(`/delete-entrenador/${Trainer.id}`);
    if (response.status === 200) {
      console.log("Entrenador eliminado con éxito.");

      setTrainers((prevTrainers) => {
        const updatedTrainers = prevTrainers.filter((u) => u.id !== Trainer.id);
        const reassignedTrainers = updatedTrainers.map((u, index) => ({
          ...u,
          id: index + 1,
        }));

        return reassignedTrainers;
      });
    } else {
      console.error("Error al eliminar el entrenador.");
    }
  } catch (error) {
    console.error("Hubo un error al intentar eliminar el entrenador:", error);
  }
}