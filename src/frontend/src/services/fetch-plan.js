"use server";

import api from './api';
import data from './data.json';

export async function readPlanes({ setPlanes }) {
  try {
    const response = await api.get('/get-planes');

    if (response.data && Array.isArray(response.data)) {
      setPlanes(response.data);
    } else {
      console.warn('Respuesta de la API no válida. Usando datos predeterminados.');
      setPlanes(data.Planes);
    }
  } catch (error) {
    console.error('Error al obtener los planes:', error);
    setPlanes(data.Planes);
  }
}

export async function createPlan({ data }) {
  try {
    const response = await api.post('/create-plan', data);
    console.log('Plan creado con éxito:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al crear el plan:', error);
    throw new Error('Error al crear el plan');
  }
}

export async function updatePlan({ data, id }) {
  try {
    const response = await api.put(`/update-plan/${id}`, data);
    console.log('Plan actualizado con éxito:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el plan:', error);
    throw new Error('Error al actualizar el plan');
  }
}

export async function deletePlan({ plan, setPlanes }) {
  try {
    const response = await api.delete(`/delete-plan/${plan.id}`);
    if (response.status === 200) {
      console.log('Plan eliminado con éxito.');

      setPlanes((prevPlans) => 
        prevPlans
          .filter((u) => u.id !== plan.id)
          .map((u, index) => ({ ...u, id: index + 1 }))
      );
    } else {
      console.error('Error al eliminar el plan. Verifica la respuesta de la API.');
    }
  } catch (error) {
    console.error('Error al intentar eliminar el plan:', error);
    throw new Error('Error al eliminar el plan');
  }
}
