"use server"

import api from '../services/api';
import data from '../services/data.json';

export async function readUsers ({setUsers}) {
  try {
    const response = await api.get('/get-usuarios');

    if (response.data && Array.isArray(response.data)) {
      setUsers(response.data);
    } else {
      console.warn('Datos de usuarios no válidos. Usando datos predeterminados.');
      setUsers(data.Usuarios);
    }
  } catch (error) {
    console.error('Error fetching Usuarios:', error);
    setUsers(data.Usuarios);
  }
};

export async function createUser({data}) {
  try {
      const response = await api.post("/create-usuario", data);
      console.log("Usuario creado con éxito:", response.data);
  } catch (error) {
    console.error(`Error al crear el usuario:`, error);
  }
}

export async function updateUser({ data, id }) {
  if (!id || !data) {
    console.error("ID o datos de usuario no válidos");
    return;
  }

  try {
    const response = await api.put(`/update-usuario/${id}`, data);
    console.log("Usuario actualizado con éxito:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el usuario:", error.response ? error.response.data : error.message);
  }
}


export async function deleteUser({user, setUsers}) {
  try {
    const response = await api.delete(`/delete-usuario/${user.id}`);
    if (response.status === 200) {
      console.log("Usuario eliminado con éxito.");

      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.filter((u) => u.id !== user.id);
        const reassignedUsers = updatedUsers.map((u, index) => ({
          ...u,
          id: index + 1,
        }));

        return reassignedUsers;
      });
    } else {
      console.error("Error al eliminar el usuario.");
    }
  } catch (error) {
    console.error("Hubo un error al intentar eliminar el usuario:", error);
  }
}