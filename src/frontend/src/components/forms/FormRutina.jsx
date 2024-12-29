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
import { createRoutine, updateRoutine } from "../../services/fetch-routine";

// Esquema de validación
const formSchema = z.object({
  usuario_id: z.number().int().positive({ message: "ID de usuario debe ser un número positivo." }),
  entrenador_id: z.number().int().positive({ message: "ID de entrenador debe ser un número positivo." }),
  nombre: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres." }),
  objetivo: z.string().min(10, { message: "El objetivo debe tener al menos 10 caracteres." }),
  fecha_creacion: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "La fecha debe estar en formato YYYY-MM-DD.",
  }),
});

const RoutineForm = ({ action, routine, id }) => {
  const defaultValues = action === "create"
    ? {
        usuario_id: 0,
        entrenador_id: 0,
        nombre: "",
        objetivo: "",
        fecha_creacion: "",
      }
    : { ...routine };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    action === "create"
      ? createRoutine({ data })
      : updateRoutine({ data, id });
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
                  placeholder="Ingresa el ID del usuario"
                  className="w-full p-3 text-lg rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Entrenador ID */}
        <FormField
          control={form.control}
          name="entrenador_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">ID de Entrenador</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  placeholder="Ingresa el ID del entrenador"
                  className="w-full p-3 text-lg rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Nombre */}
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Nombre de la Rutina</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  placeholder="Ej: Rutina de fuerza"
                  className="w-full p-3 text-lg rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Objetivo */}
        <FormField
          control={form.control}
          name="objetivo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Objetivo</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  placeholder="Ej: Aumentar fuerza muscular en 4 semanas."
                  className="w-full p-3 text-lg rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Fecha Creación */}
        <FormField
          control={form.control}
          name="fecha_creacion"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Fecha de Creación</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  className="w-full p-3 text-lg rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Botón */}
        <Button type="submit" className="w-full py-3 text-lg font-semibold">
          {action === "create" ? "Crear Rutina" : "Actualizar Rutina"}
        </Button>
      </form>
    </Form>
  );
};

export default RoutineForm;
