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
const AsistenciaList = () => {
  const [asistencias, setAsistencias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAsistencias = async () => {
      setLoading(true);
      try {
        const response = await api.get('/get-asistencias');
        if (response.data && Array.isArray(response.data)) {
          setAsistencias(response.data);
        } else {
          console.warn('Datos de asistencias no válidos. Usando datos predeterminados.');
          setAsistencias(data.Asistencias);
        }
      } catch (error) {
        console.error('Error fetching asistencias:', error);
        setAsistencias(data.Asistencias);
      } finally {
        setLoading(false);
      }
    };

    fetchAsistencias();
  }, []);

  return (
    <div className="overflow-x-auto w-[80%] m-auto bg-gray-900 p-6 rounded-lg shadow-lg">
      <Table className="w-full border border-gray-700">
        <TableCaption className="text-lg font-bold text-gray-300 mb-4">Lista de asistencias</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-800">
            <TableHead className="w-[150px] text-start text-gray-300 font-medium">Fecha</TableHead>
            <TableHead className="text-start text-gray-300 font-medium">Estado</TableHead>
            <TableHead className="text-start text-gray-300 font-medium">createdAt</TableHead>
            <TableHead className="text-start text-gray-300 font-medium">updatedAt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {asistencias.map((asistencia) => (
            <TableRow
              key={asistencia.usuario_id}
              className="bg-gray-900 hover:bg-gray-700 transition-colors duration-200"
            >
              <TableCell className="text-start font-medium text-gray-100">{new Date(asistencia.fecha).toLocaleString()}</TableCell>
              <TableCell className="text-start text-gray-100">{asistencia.estado}</TableCell>
              <TableCell className="text-start text-gray-100">{new Date(asistencia.createdAt).toLocaleString()}</TableCell>
              <TableCell className="text-start text-gray-100">{new Date(asistencia.updatedAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="bg-gray-800">
            <TableCell
              colSpan={4}
              className="text-right text-gray-300 font-semibold"
            >
              Total de asistencias tomadas:
            </TableCell>
            <TableCell className="text-right text-gray-100 font-bold">
              {asistencias.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default AsistenciaList;
