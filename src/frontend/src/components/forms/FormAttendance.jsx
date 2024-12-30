"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { createAttendance, updateAttendance } from "../../services/fetch-attendance";

// Esquema de validación
const formSchema = z.object({
  usuario_id: z.number().int().positive({ message: "ID de usuario debe ser un número positivo." }),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/, {
    message: "La fecha debe estar en formato YYYY-MM-DDTHH:MM:SS.",
  }),
  estado: z.enum(["presente", "ausente"], {
    message: "El estado debe ser 'presente' o 'ausente'.",
  }),
});

const AttendanceForm = ({ action, attendance, id }) => {
  const defaultValues = action === "create"
    ? {
        usuario_id: 0,
        fecha: "",
        estado: "presente",
      }
    : { ...attendance };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    action === "create"
      ? createAttendance({ data })
      : updateAttendance({ data, id });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-[90%] max-w-lg bg-gray-900 text-white p-6 rounded-lg shadow-md m-auto"
      >
        {/* Campo Usuario ID */}
        <FormField
          control={form.control}
          name="usuario_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">ID de Usuario</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  placeholder="Ingresa el ID del usuario"
                  className="w-full p-3 text-lg rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Fecha */}
        <FormField
          control={form.control}
          name="fecha"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Fecha de Asistencia</FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(new Date(e.target.value).toISOString().slice(0, 19))}
                  className="w-full p-3 text-lg rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Estado */}
        <FormField
          control={form.control}
          name="estado"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Estado</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full p-3 text-lg rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="presente">Presente</option>
                  <option value="ausente">Ausente</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Botón */}
        <Button type="submit" className="w-full py-3 text-lg font-semibold">
          {action === "create" ? "Registrar Asistencia" : "Actualizar Asistencia"}
        </Button>
      </form>
    </Form>
  );
};

export default AttendanceForm;
