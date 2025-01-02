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
import {deleteProgress, readProgress} from '../services/fetch-progress';
import ProgressForm from './forms/FormProgreso';
import {readUsers} from '../services/fetch-user';

const ProgresoList = () => {
  const [progress, setProgress] = useState([]);
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    readProgress({setProgress})
    readUsers({setUsers})
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
              <DialogTitle className="text-lg font-semibold">Crear nuevo progreso</DialogTitle>
              <DialogDescription className="text-sm text-gray-400">
                Completa los campos para agregar un nuevo plan al sistema.
              </DialogDescription>
            </DialogHeader>
            <ProgressForm action="create" />
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
                Esta acción eliminará permanentemente los progresos de la tabla
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
        <TableCaption className="text-lg font-bold text-gray-300 mb-4">Lista de progresos</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-800">
            <TableHead className="text-start text-gray-300 font-medium">ID</TableHead>
            <TableHead className="w-[150px] text-start text-gray-300 font-medium">ID de usuario</TableHead>
            <TableHead className="w-[150px] text-start text-gray-300 font-medium">Nombre</TableHead>
            <TableHead className="text-start text-gray-300 font-medium">Peso</TableHead>
            <TableHead className="text-start text-gray-300 font-medium">Porcentaje de grasa</TableHead>
            <TableHead className="text-start text-gray-300 font-medium">Fecha</TableHead>
            <TableHead className="text-start text-gray-300 font-medium">Creado el</TableHead>
            <TableHead className="text-start text-gray-300 font-medium">Actualizado el</TableHead>
            <TableHead className="text-left text-gray-300 font-medium">Modificar</TableHead>
            <TableHead className="text-left text-gray-300 font-medium">Eliminar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {progress.map((progres) => (
            <TableRow
              key={progres.usuario_id}
              className="bg-gray-900 hover:bg-gray-700 transition-colors duration-200"
            >
              <TableCell className="text-start text-gray-100">{progres.id}</TableCell>
              <TableCell className="text-start font-medium text-gray-100">{progres.usuario_id}</TableCell>
              <TableCell className="text-start text-gray-100">{users.find((user) => user.id === progres.usuario_id)?.nombre|| "Usuario no encontrado"}</TableCell>
              <TableCell className="text-start text-gray-100">{progres.peso}</TableCell>
              <TableCell className="text-start text-gray-100">{progres.porcentaje_grasa}</TableCell>
              <TableCell className="text-start text-gray-100">{new Date(progres.fecha).toLocaleString()}</TableCell>
              <TableCell className="text-start text-gray-100">{new Date(progres.createdAt).toLocaleString()}</TableCell>
              <TableCell className="text-start text-gray-100">{new Date(progres.updatedAt).toLocaleString()}</TableCell>
              <TableCell className="text-center text-gray-100">
                <Dialog>
                  <DialogTrigger >
                    <SquarePen />
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 h-max max-h-[90%] scroll-my-10 text-white rounded-lg p-6">
                    <DialogHeader>
                      <DialogTitle className="text-lg font-semibold">Actualizar progreso</DialogTitle>
                      <DialogDescription className="text-sm text-gray-400">
                        Completa los campos a modificar y luego dale a continuar para ceptar el cambio.
                      </DialogDescription>
                    </DialogHeader>
                    <ProgressForm action="update" progres={progres} id={progres.id} />
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
                        Esta acción eliminará permanentemente el progreso
                        y eliminará los datos de nuestros servidores.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={async () => {
                          deleteProgress({progres, setProgress})
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
              Total de progresos:
            </TableCell>
            <TableCell className="text-right text-gray-100 font-bold">
              {progress.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default ProgresoList;
