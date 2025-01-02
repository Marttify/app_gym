import React, {useEffect, useState} from 'react';
import {Trash2, SquarePen, UserPlus} from 'lucide-react';
import '../tailwind.css';
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

import {deleteTrainer, readTrainers} from '../services/fetch-trainer';
import {readUsers} from '../services/fetch-user';
import TrainerForm from './forms/FormEntrenador';

const EntrenadoresList = () => {
  const [trainers, setTrainers] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    readTrainers({setTrainers});
    readUsers({setUsers});
  }, []);

  return (
    <div className="overflow-x-auto w-[80%] m-auto bg-gray-900 p-6 rounded-lg shadow-lg">
      <Table className="w-full border border-gray-700">
        <TableCaption className="text-lg font-bold text-gray-300 mb-4">Lista de trainers</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-800">
            <TableHead className="text-left text-gray-300 font-medium">ID</TableHead>
            <TableHead className="w-[150px] text-left text-gray-300 font-medium">ID de entrenador</TableHead>
            <TableHead className="text-left text-gray-300 font-medium">Nombre</TableHead>
            <TableHead className="text-left text-gray-300 font-medium">Especialidad</TableHead>
            <TableHead className="text-left text-gray-300 font-medium">Calificacion</TableHead>
            <TableHead className="text-start text-gray-300 font-medium">Creado el</TableHead>
            <TableHead className="text-start text-gray-300 font-medium">Actualizado el</TableHead>
            <TableHead className="text-left text-gray-300 font-medium">Modificar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trainers.map((trainer) => (
            <TableRow
              key={trainer.usuario_id}
              className="bg-gray-900 hover:bg-gray-700 transition-colors duration-200"
            >
              <TableCell className="text-left text-gray-100">{trainer.id}</TableCell>
              <TableCell className="text-left font-medium text-gray-100">{trainer.usuario_id}</TableCell>
              <TableCell className="text-start text-gray-100">{users.find((user) => user.id === trainer.usuario_id)?.nombre || "Usuario no encontrado"}</TableCell>
              <TableCell className="text-left text-gray-100">{trainer.especialidad}</TableCell>
              <TableCell className="text-left text-gray-100">{trainer.calificacion}</TableCell>
              <TableCell className="text-start text-gray-100">{new Date(trainer.createdAt).toLocaleString()}</TableCell>
              <TableCell className="text-start text-gray-100">{new Date(trainer.updatedAt).toLocaleString()}</TableCell>
              <TableCell className="text-center text-gray-100">
                <Dialog>
                  <DialogTrigger >
                    <SquarePen />
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 h-max max-h-[90%] scroll-my-10 text-white rounded-lg p-6">
                    <DialogHeader>
                      <DialogTitle className="text-lg font-semibold">Actualizar entrenador</DialogTitle>
                      <DialogDescription className="text-sm text-gray-400">
                        Completa los campos a modificar y luego dale a continuar para ceptar el cambio.
                      </DialogDescription>
                    </DialogHeader>
                    <TrainerForm action="update" trainer={trainer} id={trainer.id} />
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="bg-gray-800">
            <TableCell
              colSpan={7}
              className="text-right text-gray-300 font-semibold"
            >
              Total de entrenadores:
            </TableCell>
            <TableCell className="text-right text-gray-100 font-bold">
              {trainers.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default EntrenadoresList;
