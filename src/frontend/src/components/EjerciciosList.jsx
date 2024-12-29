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

import {deleteExercise, readExercise} from '../services/fetch-exercise';
import ExerciseForm from './forms/FormEjercicio';
const EjerciciosList = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    readExercise({setExercises});
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
              <DialogTitle className="text-lg font-semibold">Crear nuevo ejercicio</DialogTitle>
              <DialogDescription className="text-sm text-gray-400">
                Completa los campos para agregar un nuevo usuario al sistema.
              </DialogDescription>
            </DialogHeader>
            <ExerciseForm action="create" />
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
                Esta acción eliminará permanentemente los ejercicios de la tabla
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
        <TableCaption className="text-lg font-bold text-gray-300 mb-4">Lista de ejercicios</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-800">
            <TableHead className="w-[150px] text-start text-gray-300 font-medium">Fecha</TableHead>
            <TableHead className="text-start text-gray-300 font-medium">Estado</TableHead>
            <TableHead className="text-start text-gray-300 font-medium">createdAt</TableHead>
            <TableHead className="text-start text-gray-300 font-medium">Estado</TableHead>
            <TableHead className="text-left text-gray-300 font-medium">Modificar</TableHead>
            <TableHead className="text-left text-gray-300 font-medium">Eliminar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exercises.map((exercise) => (
            <TableRow
              key={exercise.usuario_id}
              className="bg-gray-900 hover:bg-gray-700 transition-colors duration-200"
            >
              <TableCell className="text-start font-medium text-gray-100">{exercise.nombre}</TableCell>
              <TableCell className="text-start text-gray-100">{exercise.musculo_objetivo}</TableCell>
              <TableCell className="text-start text-gray-100">{exercise.descripcion}</TableCell>
              <TableCell className="text-start text-gray-100">{exercise.nivel_dificultad}</TableCell>
              <TableCell className="text-start text-gray-100">{new Date(exercise.createdAt).toLocaleString()}</TableCell>
              <TableCell className="text-start text-gray-100">{new Date(exercise.updatedAt).toLocaleString()}</TableCell>
              <TableCell className="text-center text-gray-100">
                <Dialog>
                  <DialogTrigger >
                    <SquarePen />
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 h-max max-h-[90%] scroll-my-10 text-white rounded-lg p-6">
                    <DialogHeader>
                      <DialogTitle className="text-lg font-semibold">Actualizar ejercicio</DialogTitle>
                      <DialogDescription className="text-sm text-gray-400">
                        Completa los campos a modificar y luego dale a continuar para ceptar el cambio.
                      </DialogDescription>
                    </DialogHeader>
                    <ExerciseForm action="update" exercise={exercise} id={exercise.id} />
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
                        Esta acción eliminará permanentemente el ejercicio
                        y eliminará sus datos de nuestros servidores.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={async () => {
                          deleteExercise({exercise, setExercises})
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
              Total de ejercicios tomados:
            </TableCell>
            <TableCell className="text-right text-gray-100 font-bold">
              {exercises.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default EjerciciosList;
