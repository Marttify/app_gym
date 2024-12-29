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
import {createTrainer, updateTrainer} from "../../services/fetch-trainer";

// Esquema de validación
const formSchema = z.object({
  usuario_id: z.number().int().positive({ message: "ID de usuario debe ser un número positivo." }),
  especialidad: z.string().min(2, { message: "La especialidad debe tener al menos 2 caracteres." }),
  calificacion: z.number().min(0).max(5, { message: "La calificación debe estar entre 0 y 5." }),
});

const TrainerForm = ({ action, trainer, id }) => {
  const defaultValues = action === "create"
    ? {
        usuario_id: 0,
        especialidad: "",
        calificacion: 0,
      }
    : { ...trainer };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    action === "create"
      ? createTrainer({ data })
      : updateTrainer({ data, id });
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

        {/* Campo Especialidad */}
        <FormField
          control={form.control}
          name="especialidad"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Especialidad</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Ingresa la especialidad del entrenador"
                  className="w-full p-3 text-lg rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Calificación */}
        <FormField
          control={form.control}
          name="calificacion"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Calificación</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  {...field}
                  placeholder="Ingresa la calificación del entrenador (0 a 5)"
                  className="w-full p-3 text-lg rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Botón */}
        <Button type="submit" className="w-full py-3 text-lg font-semibold">
          {action === "create" ? "Agregar Entrenador" : "Actualizar Entrenador"}
        </Button>
      </form>
    </Form>
  );
};

export default TrainerForm;
