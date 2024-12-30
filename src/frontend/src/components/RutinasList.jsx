import React, {useEffect, useState} from 'react';
import {SquarePen, Trash2, UserPlus} from 'lucide-react';
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


import {deleteRoutine, readRoutine} from '../services/fetch-routine';
import RoutineForm from './forms/FormRutina';

const Routine = () => {
  const [routine, setRoutine] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    readRoutine({setRoutine});
  }, []);

  return (
    <div className="overflow-x-auto w-[80%] m-auto bg-gray-900 p-6 rounded-lg shadow-lg">
      <div className='flex'>
        <Dialog>
          <DialogTrigger className='text-white px-3 py-2 border-2 border-white rounded-md m-2'>
            <UserPlus />
          </DialogTrigger>
          <DialogContent className="bg-gray-900 h-max max-h-[90%] scroll-my-10 text-white rounded-lg p-6">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">Crear nueva rutina</DialogTitle>
              <DialogDescription className="text-sm text-gray-400">
                Completa los campos para agregar una nueva rutina al sistema.
              </DialogDescription>
            </DialogHeader>
            <RoutineForm action="create" />
          </DialogContent>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger className='m-2 text-white px-3 py-2 border-2 border-white rounded-md'>
            <Trash2 />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Estas seguro de eliminar toda la tabla?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción eliminará permanentemente las rutinas de la tabla
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
      <Table className="w-full border border-gray-700">
        <TableCaption className="text-lg font-bold text-gray-300 mb-4">Lista de rutinas</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-800">
            <TableHead className="text-start text-gray-300 font-medium">ID</TableHead>
            <TableHead className="w-[150px] text-start text-gray-300 font-medium">ID de la rutina</TableHead>
            <TableHead className="text-start text-gray-300 font-medium">ID del ejercicio</TableHead>
            <TableHead className="text-start text-gray-300 font-medium">Repeticiones</TableHead>
            <TableHead className="text-start text-gray-300 font-medium">Series</TableHead>
            <TableHead className="text-start text-gray-300 font-medium">createdAt</TableHead>
            <TableHead className="text-start text-gray-300 font-medium">updatedAt</TableHead>
            <TableHead className="text-left text-gray-300 font-medium">Modificar</TableHead>
            <TableHead className="text-left text-gray-300 font-medium">Eliminar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {routine.map((rout) => (
            <TableRow
              key={rout.usuario_id}
              className="bg-gray-900 hover:bg-gray-700 transition-colors duration-200"
            >
              <TableCell className="text-start text-gray-100">{rout.id}</TableCell>
              <TableCell className="text-start font-medium text-gray-100">{rout.rutina_id}</TableCell>
              <TableCell className="text-start text-gray-100">{rout.ejercicio_id}</TableCell>
              <TableCell className="text-start text-gray-100">{rout.repeticiones}</TableCell>
              <TableCell className="text-start text-gray-100">{new Date(rout.series).toLocaleString()}</TableCell>
              <TableCell className="text-start text-gray-100">{new Date(rout.createdAt).toLocaleString()}</TableCell>
              <TableCell className="text-start text-gray-100">{new Date(rout.updatedAt).toLocaleString()}</TableCell>
              <TableCell className="text-center text-gray-100">
                <Dialog>
                  <DialogTrigger >
                    <SquarePen />
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 h-max max-h-[90%] scroll-my-10 text-white rounded-lg p-6">
                    <DialogHeader>
                      <DialogTitle className="text-lg font-semibold">Actualizar rutina</DialogTitle>
                      <DialogDescription className="text-sm text-gray-400">
                        Completa los campos a modificar y luego dale a continuar para ceptar el cambio.
                      </DialogDescription>
                    </DialogHeader>
                    <RoutineForm action="update" routine={rout} id={rout.id} />
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell className="text-center text-gray-100">
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Trash2 />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¿Estás seguro de eliminarlo?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción eliminará permanentemente la rutina
                        y eliminará los datos de nuestros servidores.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={async () => {
                          deleteRoutine({routine, setRoutine})
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
          <TableRow className="bg-gray-800">
            <TableCell
              colSpan={7}
              className="text-right text-gray-300 font-semibold"
            >
              Total de rutinas:
            </TableCell>
            <TableCell className="text-right text-gray-100 font-bold">
              {routine.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default Routine;
