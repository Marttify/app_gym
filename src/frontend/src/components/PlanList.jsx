import React, { useEffect, useState } from 'react';
import api from '../services/api';
import data  from '../services/data.json';
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

const PlanList = () => {
  const [planes, setPlanes] = useState([]);

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const response = await api.get('/get-planes');
        
        if (response.data && Array.isArray(response.data)) {
          setPlanes(response.data);
        } else {
          console.warn('Datos de planes no válidos. Usando datos predeterminados.');
          setPlanes(data.Planes);
        }
      } catch (error) {
        console.error('Error fetching Planes:', error);
        setPlanes(data.Planes);
      }
    };

    fetchPlanes();
  }, []);

  return (
    <div className="overflow-x-auto w-[80%] m-auto bg-gray-900 p-6 rounded-lg shadow-lg">
      <Table className="w-full border border-gray-700">
        <TableCaption className="text-lg font-bold text-gray-300 mb-4">Lista de planes</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-800">
            <TableHead className="w-[150px] text-left text-gray-300 font-medium">Nombre</TableHead>
            <TableHead className="text-center text-gray-300 font-medium">Precio</TableHead>
            <TableHead className="text-center text-gray-300 font-medium">duración</TableHead>
            <TableHead className="text-start text-gray-300 font-medium">descripción</TableHead>
            <TableHead className="text-start text-gray-300 font-medium">createdAt</TableHead>
            <TableHead className="text-start text-gray-300 font-medium">updatedAt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {planes.map((plan) => (
            <TableRow
              key={plan.id}
              className="bg-gray-900 hover:bg-gray-700 transition-colors duration-200"
            >
              <TableCell className="text-start font-medium text-gray-100">{plan.nombre}</TableCell>
              <TableCell className="text-center text-gray-100">{plan.precio}</TableCell>
              <TableCell className="text-center text-gray-100">{plan.duracion}</TableCell>
              <TableCell className="text-start text-gray-100">{plan.descripcion}</TableCell>
              <TableCell className="text-start text-gray-100">{new Date(plan.createdAt).toLocaleString()}</TableCell>
              <TableCell className="text-start text-gray-100">{new Date(plan.updatedAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="bg-gray-800">
            <TableCell
              colSpan={4}
              className="text-right text-gray-300 font-semibold"
            >
              Total de planes:
            </TableCell>
            <TableCell className="text-right text-gray-100 font-bold">
              {planes.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default PlanList;
