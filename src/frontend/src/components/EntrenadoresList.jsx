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

const EntrenadoresList = () => {
  const [entrenadores, setEntrenadores] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/get-entrenadores');

        if (response.data && Array.isArray(response.data)) {
          setEntrenadores(response.data);
        } else {
          console.warn('Datos de usuarios no válidos. Usando datos predeterminados.');
          setEntrenadores(data.Entrenadores);
        }
      } catch (error) {
        console.error('Error fetching entrenadores:', error);
        setEntrenadores(data.Entrenadores);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="overflow-x-auto w-[80%] m-auto bg-gray-900 p-6 rounded-lg shadow-lg">
      <Table className="w-full border border-gray-700">
        <TableCaption className="text-lg font-bold text-gray-300 mb-4">Lista de entrenadores</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-800">
            <TableHead className="w-[150px] text-left text-gray-300 font-medium">ID de entrenador</TableHead>
            <TableHead className="text-left text-gray-300 font-medium">Especialidad</TableHead>
            <TableHead className="text-left text-gray-300 font-medium">Calificacion</TableHead>
            <TableHead className="text-start text-gray-300 font-medium">createdAt</TableHead>
            <TableHead className="text-start text-gray-300 font-medium">updatedAt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entrenadores.map((entrenador) => (
            <TableRow
              key={entrenador.usuario_id}
              className="bg-gray-900 hover:bg-gray-700 transition-colors duration-200"
            >
              <TableCell className="text-left font-medium text-gray-100">{entrenador.usuario_id}</TableCell>
              <TableCell className="text-left text-gray-100">{entrenador.especialidad}</TableCell>
              <TableCell className="text-left text-gray-100">{entrenador.calificacion}</TableCell>
              <TableCell className="text-start text-gray-100">{new Date(entrenador.createdAt).toLocaleString()}</TableCell>
              <TableCell className="text-start text-gray-100">{new Date(entrenador.updatedAt).toLocaleString()}</TableCell>
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
              {entrenadores.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default EntrenadoresList;
