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
import {createExercise, updateExercise} from "../../services/fetch-exercise";

// Esquema de validación
const formSchema = z.object({
  nombre: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  musculo_objetivo: z.string().min(2, { message: "Debe ingresar un músculo objetivo." }),
  descripcion: z.string().min(10, { message: "La descripción debe tener al menos 10 caracteres." }),
  nivel_dificultad: z.enum(["principiante", "intermedio", "avanzado"], {
    message: "El nivel de dificultad debe ser uno de: principiante, intermedio o avanzado.",
  }),
});

const ExerciseForm = ({ action, exercise, id }) => {
  const defaultValues = action === "create"
    ? {
        nombre: "",
        musculo_objetivo: "",
        descripcion: "",
        nivel_dificultad: "intermedio",
      }
    : { ...exercise };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    action === "create"
      ? createExercise({ data })
      : updateExercise({ data, id });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-[90%] max-w-lg bg-gray-900 text-white p-6 rounded-lg shadow-md m-auto"
      >
        {/* Campo Nombre */}
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Nombre</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Ingresa el nombre del ejercicio"
                  className="w-full p-3 text-lg rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Músculo Objetivo */}
        <FormField
          control={form.control}
          name="musculo_objetivo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Músculo Objetivo</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Ingresa el músculo objetivo"
                  className="w-full p-3 text-lg rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Descripción */}
        <FormField
          control={form.control}
          name="descripcion"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Descripción</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Describe el ejercicio"
                  className="w-full p-3 text-lg rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Nivel de Dificultad */}
        <FormField
          control={form.control}
          name="nivel_dificultad"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Nivel de Dificultad</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full p-3 text-lg rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="principiante">Principiante</option>
                  <option value="intermedio">Intermedio</option>
                  <option value="avanzado">Avanzado</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Botón */}
        <Button type="submit" className="w-full py-3 text-lg font-semibold">
          {action === "create" ? "Agregar Ejercicio" : "Actualizar Ejercicio"}
        </Button>
      </form>
    </Form>
  );
};

export default ExerciseForm;
