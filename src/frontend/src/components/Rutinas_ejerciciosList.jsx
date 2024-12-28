import React, {useEffect, useState} from 'react';
import api from '../services/api';
import data from '../services/data.json';
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

const Rutinas_ejerciciosList = () => {
  const [rutinasEjercicios, setRutinasEjercicios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAsistencias = async () => {
      setLoading(true);
      try {
        const response = await api.get('/get-rutinas_ejercicios');
        if (response.data && Array.isArray(response.data)) {
          setRutinasEjercicios(response.data);
        } else {
          console.warn('Datos de asistencias no válidos. Usando datos predeterminados.');
          setRutinasEjercicios(data.Rutinas_Ejercicios);
        }
      } catch (error) {
        console.error('Error fetching progreso:', error);
        setRutinasEjercicios(data.Rutinas_Ejercicios);
      } finally {
        setLoading(false);
      }
    };

    fetchAsistencias();
  }, []);

  return (
    <div className="overflow-x-auto w-[80%] m-auto bg-gray-900 p-6 rounded-lg shadow-lg">
      <Table className="w-full border border-gray-700">
        <TableCaption className="text-lg font-bold text-gray-300 mb-4">Lista de ejercicios en las rutinas</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-800">
            <TableHead className="w-[150px] text-start text-gray-300 font-medium">ID de la rutina</TableHead>
            <TableHead className="text-start text-gray-300 font-medium">ID del ejercicio</TableHead>
            <TableHead className="text-start text-gray-300 font-medium">Repeticiones</TableHead>
            <TableHead className="text-start text-gray-300 font-medium">Series</TableHead>
            <TableHead className="text-start text-gray-300 font-medium">createdAt</TableHead>
            <TableHead className="text-start text-gray-300 font-medium">updatedAt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rutinasEjercicios.map((rutina_ejercicio) => (
            <TableRow
              key={rutina_ejercicio.usuario_id}
              className="bg-gray-900 hover:bg-gray-700 transition-colors duration-200"
            >
              <TableCell className="text-start font-medium text-gray-100">{rutina_ejercicio.rutina_id}</TableCell>
              <TableCell className="text-start text-gray-100">{rutina_ejercicio.ejercicio_id}</TableCell>
              <TableCell className="text-start text-gray-100">{rutina_ejercicio.repeticiones}</TableCell>
              <TableCell className="text-start text-gray-100">{new Date(rutina_ejercicio.series).toLocaleString()}</TableCell>
              <TableCell className="text-start text-gray-100">{new Date(rutina_ejercicio.createdAt).toLocaleString()}</TableCell>
              <TableCell className="text-start text-gray-100">{new Date(rutina_ejercicio.updatedAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="bg-gray-800">
            <TableCell
              colSpan={4}
              className="text-right text-gray-300 font-semibold"
            >
              Total de rutinas de ejercicios:
            </TableCell>
            <TableCell className="text-right text-gray-100 font-bold">
              {rutinasEjercicios.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default Rutinas_ejerciciosList;
