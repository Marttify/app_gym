"use server"

import api from './api';
import data from './data.json';

export async function readProgress ({setProgress}) {
  try {
    const response = await api.get('/get-progresos');

    if (response.data && Array.isArray(response.data)) {
      setProgress(response.data);
    } else {
      console.warn('Datos de prgresos no válidos. Usando datos predeterminados.');
      setProgress(data.Progreso);
    }
  } catch (error) {
    console.error('Error fetching Progresos:', error);
    setProgress(data.Progreso);
  }
};

export async function createProgress({data}) {
  try {
      const response = await api.post("/create-progreso", data);
      console.log("Progreso creado con éxito:", response.data);
  } catch (error) {
    console.error(`Error al crear el progreso:`, error);
  }
}

export async function updateProgress({ data, id}) {
  try {
    const response = await api.put(`/update-progreso/${id}`, data);
    console.log("Progreso actualizado con éxito:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el progreso:`, error);
  }
}

export async function deleteProgress({progres, setProgress}) {
  try {
    const response = await api.delete(`/delete-progreso/${progres.id}`);
    if (response.status === 200) {
      console.log("Progreso eliminado con éxito.");

      setProgress((prevProgress) => {
        const updatedProgress = prevProgress.filter((u) => u.id !== progres.id);
        const reassignedProgress = updatedProgress.map((u, index) => ({
          ...u,
          id: index + 1,
        }));

        return reassignedProgress;
      });
    } else {
      console.error("Error al eliminar el progreso.");
    }
  } catch (error) {
    console.error("Hubo un error al intentar eliminar el progreso:", error);
  }
}