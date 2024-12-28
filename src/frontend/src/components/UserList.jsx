import React, {useEffect, useState} from 'react';
import api from '../services/api';
import '../tailwind.css';
import data from '../services/data.json';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import ProfileFormUser from './FormUser';


const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
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

    fetchUsers();
  }, []);

  return (
    <div className="overflow-x-auto w-[80%] m-auto bg-gray-900 p-6 rounded-lg shadow-lg">
      <Dialog>
        <DialogTrigger className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'>
          Crear +
        </DialogTrigger>
        <DialogContent className="bg-gray-900 h-[90%] scroll-my-10 text-white rounded-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Crear nuevo usuario</DialogTitle>
            <DialogDescription className="text-sm text-gray-400">
              Completa los campos para agregar un nuevo usuario al sistema.
            </DialogDescription>
          </DialogHeader>
          <ProfileFormUser length={users.length}/> {/* Este es tu formulario de creación de usuario */}
        </DialogContent>
      </Dialog>
      <Table className="w-full border border-gray-700">
        <TableCaption className="text-lg font-bold text-gray-300 mb-4">Lista de Usuarios</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-800">
            <TableHead className="w-[150px] text-left text-gray-300 font-medium">Nombre</TableHead>
            <TableHead className="text-left text-gray-300 font-medium">Apellido</TableHead>
            <TableHead className="text-left text-gray-300 font-medium">Email</TableHead>
            <TableHead className="text-left text-gray-300 font-medium">Rol</TableHead>
            <TableHead className="text-left text-gray-300 font-medium">Contraseña</TableHead>
            <TableHead className="text-left text-gray-300 font-medium">createdAt</TableHead>
            <TableHead className="text-left text-gray-300 font-medium">updatedAt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className="bg-gray-900 hover:bg-gray-700 transition-colors duration-200"
            >
              <TableCell className="text-left font-medium text-gray-100">{user.nombre}</TableCell>
              <TableCell className="text-left text-gray-100">{user.apellido}</TableCell>
              <TableCell className="text-left text-gray-100">{user.email}</TableCell>
              <TableCell className="text-left text-gray-100">{user.rol}</TableCell>
              <TableCell className="text-left text-gray-100">{user.contraseña}</TableCell>
              <TableCell className="text-start text-gray-100">{new Date(user.createdAt).toLocaleString()}</TableCell>
              <TableCell className="text-start text-gray-100">{new Date(user.updatedAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="bg-gray-800">
            <TableCell
              colSpan={4}
              className="text-right text-gray-300 font-semibold"
            >
              Total de Usuarios:
            </TableCell>
            <TableCell className="text-right text-gray-100 font-bold">
              {users.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default UserList;
