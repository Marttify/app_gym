"use server"

import api from './api';
import data from './data.json';

export async function readMemberships ({setMemberships}) {
  try {
    const response = await api.get('/get-membresias');

    if (response.data && Array.isArray(response.data)) {
      setMemberships(response.data);
    } else {
      console.warn('Datos de las membresias no válidas. Usando datos predeterminados.');
      setMemberships(data.Membresias);
    }
  } catch (error) {
    console.error('Error fetching Membresias:', error);
    setMemberships(data.Membresias);
  }
};

export async function createMembership({data}) {
  try {
      const response = await api.post("/create-membresia", data);
      console.log("Membresia creado con éxito:", response.data);
  } catch (error) {
    console.error(`Error al crear el membresia:`, error);
  }
}

export async function updateMembership({ data, id}) {
  try {
    const response = await api.put(`/update-membresia/${id}`, data);
    console.log("Membresia actualizado con éxito:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el membresia:`, error);
  }
}

export async function deleteMembership({membership, setMemberships}) {
  try {
    const response = await api.delete(`/delete-membresia/${membership.id}`);
    if (response.status === 200) {
      console.log("Membresia eliminado con éxito.");

      setMemberships((prevMemberships) => {
        const updatedMemberships = prevMemberships.filter((u) => u.id !== membership.id);
        const reassignedMemberships = updatedMemberships.map((u, index) => ({
          ...u,
          id: index + 1,
        }));

        return reassignedMemberships;
      });
    } else {
      console.error("Error al eliminar la membresia.");
    }
  } catch (error) {
    console.error("Hubo un error al intentar eliminar la membresia:", error);
  }
}