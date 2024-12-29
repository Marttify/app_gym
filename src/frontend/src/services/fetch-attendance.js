"use server"

import api from './api';
import data from './data.json';

export async function readAttendance ({setAttendances}) {
  try {
    const response = await api.get('/get-asistencias');

    if (response.data && Array.isArray(response.data)) {
      setAttendances(response.data);
    } else {
      console.warn('Datos de asistencias no válidos. Usando datos predeterminados.');
      setAttendances(data.Asistencias);
    }
  } catch (error) {
    console.error('Error fetching asistencias:', error);
    setAttendances(data.Asistencias);
  }
};

export async function createAttendance({data}) {
  try {
      const response = await api.post("/create-asistencia", data);
      console.log("Asistencia creada con éxito:", response.data);
  } catch (error) {
    console.error(`Error al crear la asistencia:`, error);
  }
}

export async function updateAttendance({ data, id}) {
  try {
    const response = await api.put(`/update-asistencia/${id}`, data);
    console.log("Asistencia actualizada con éxito:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la asistencia:`, error);
  }
}

export async function deleteAttendance({Attendance, setAttendances}) {
  try {
    const response = await api.delete(`/delete-asistencia/${Attendance.id}`);
    if (response.status === 200) {
      console.log("Asistencia eliminada con éxito.");

      setAttendances((prevAsistensetAttendances) => {
        const updatedAsistensetAttendances = prevAsistensetAttendances.filter((u) => u.id !== Attendance.id);
        const reassignedAsistensetAttendances = updatedAsistensetAttendances.map((u, index) => ({
          ...u,
          id: index + 1,
        }));

        return reassignedAsistensetAttendances;
      });
    } else {
      console.error("Error al eliminar la asistencia.");
    }
  } catch (error) {
    console.error("Hubo un error al intentar eliminar la asistencia:", error);
  }
}
