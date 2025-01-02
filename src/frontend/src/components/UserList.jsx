import React, {useEffect, useState} from 'react';
import '../tailwind.css';
import {Trash2, SquarePen, UserPlus} from 'lucide-react';

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
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog"

import ProfileFormUser from './forms/FormUser';
import {deleteUser, readUsers} from '../services/fetch-user';


const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    readUsers({setUsers});
  }, []);

  return (
    <div className="overflow-x-auto w-[80%] bg-gray-900 text-white m-auto p-6 rounded-lg shadow-lg">
      <div className='flex'>
        <Dialog>
          <DialogTrigger className='px-3 py-2 border-2 border-white rounded-md m-2'>
            <UserPlus />
          </DialogTrigger>
          <DialogContent className="bg-gray-900 text-white">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">Crear nuevo usuario</DialogTitle>
              <DialogDescription className="text-sm">
                Completa los campos para agregar un nuevo usuario al sistema.
              </DialogDescription>
            </DialogHeader>
            <ProfileFormUser action="create" />
          </DialogContent>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger className='m-2 px-3 py-2 border-2 border-white rounded-md'>
            <Trash2 />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Estas seguro de eliminar toda la tabla?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción eliminará permanentemente los usuarios de la tabla
                y eliminará sus datos de nuestros servidores.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction>Continuar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Table>
        <TableCaption className="text-lg font-bold mb-4">Lista de Usuarios</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead >ID</TableHead>
            <TableHead className="w-[150px]">Nombre</TableHead>
            <TableHead >Apellido</TableHead>
            <TableHead >Email</TableHead>
            <TableHead >Rol</TableHead>
            <TableHead >Contraseña</TableHead>
            <TableHead >Creado el</TableHead>
            <TableHead >Actualizado el</TableHead>
            <TableHead >Modificar</TableHead>
            <TableHead >Eliminar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
            >
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.nombre}</TableCell>
              <TableCell>{user.apellido}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.rol}</TableCell>
              <TableCell>{user.contraseña}</TableCell>
              <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
              <TableCell>{new Date(user.updatedAt).toLocaleString()}</TableCell>
              <TableCell className="text-center">
                <Dialog>
                  <DialogTrigger >
                    <SquarePen />
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 text-white">
                    <DialogHeader>
                      <DialogTitle className="text-lg font-semibold">Actualizar usuario</DialogTitle>
                      <DialogDescription>
                        Completa los campos a modificar y luego dale a continuar para ceptar el cambio.
                      </DialogDescription>
                    </DialogHeader>
                    <ProfileFormUser action="update" user={user} id={user.id} />
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell className="text-center">
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Trash2 />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¿Estás seguro de eliminarlo?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción eliminará permanentemente al usuario
                        y eliminará sus datos de nuestros servidores.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={async () => {
                          deleteUser({user, setUsers})
                        }}
                      >
                        Continuar
                      </AlertDialogAction>

                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell
              colSpan={7}
              className="text-right font-semibold"
            >
              Total de Usuarios:
            </TableCell>
            <TableCell className="text-right font-bold">
              {users.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default UserList;
