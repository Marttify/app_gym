"use server"

import api from './api';
import data from './data.json';

export async function readRoutine ({setRoutine}) {
  try {
    const response = await api.get('/get-rutinas');

    if (response.data && Array.isArray(response.data)) {
      setRoutine(response.data);
    } else {
      console.warn('Datos de la rutina no válidos. Usando datos predeterminados.');
      setRoutine(data.Rutinas);
    }
  } catch (error) {
    console.error('Error fetching Rutina:', error);
    setRoutine(data.Rutinas);
  }
};

export async function createRoutine({data}) {
  try {
      const response = await api.post("/create-rutina", data);
      console.log("Rutina creada con éxito:", response.data);
  } catch (error) {
    console.error(`Error al crear la rutina:`, error);
  }
}

export async function updateRoutine({ data, id}) {
  try {
    const response = await api.put(`/update-rutina/${id}`, data);
    console.log("Rutina actualizada con éxito:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la rutina:`, error);
  }
}

export async function deleteRoutine({routine, setRoutine}) {
  try {
    const response = await api.delete(`/delete-rutina/${routine.id}`);
    if (response.status === 200) {
      console.log("Rutina eliminada con éxito.");

      setRoutine((prevRoutine) => {
        const updatedRoutine = prevRoutine.filter((u) => u.id !== routine.id);
        const reassignedRoutine = updatedRoutine.map((u, index) => ({
          ...u,
          id: index + 1,
        }));

        return reassignedRoutine;
      });
    } else {
      console.error("Error al eliminar la rutina.");
    }
  } catch (error) {
    console.error("Hubo un error al intentar eliminar la rutina:", error);
  }
}