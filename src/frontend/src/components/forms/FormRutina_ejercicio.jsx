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
import {createRoutineExercise, updateRoutineExercise} from "../../services/fetch-routineExercise";

// Esquema de validación
const formSchema = z.object({
  rutina_id: z.number().int().positive({ message: "ID de rutina debe ser un número positivo." }),
  ejercicio_id: z.number().int().positive({ message: "ID de ejercicio debe ser un número positivo." }),
  repeticiones: z.number().int().positive({ message: "Las repeticiones deben ser un número positivo." }),
  series: z.number().int().positive({ message: "Las series deben ser un número positivo." }),
});

const RoutineExerciseForm = ({ action, routineExercise, id }) => {
  const defaultValues = action === "create"
    ? {
        rutina_id: 0,
        ejercicio_id: 0,
        repeticiones: 0,
        series: 0,
      }
    : { ...routineExercise };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    action === "create"
      ? createRoutineExercise({ data })
      : updateRoutineExercise({ data, id });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-[90%] max-w-lg bg-gray-900 text-white p-6 rounded-lg shadow-md m-auto"
      >
        {/* Campo Rutina ID */}
        <FormField
          control={form.control}
          name="rutina_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">ID de Rutina</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  placeholder="Ingresa el ID de la rutina"
                  className="w-full p-3 text-lg rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Ejercicio ID */}
        <FormField
          control={form.control}
          name="ejercicio_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">ID de Ejercicio</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  placeholder="Ingresa el ID del ejercicio"
                  className="w-full p-3 text-lg rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Repeticiones */}
        <FormField
          control={form.control}
          name="repeticiones"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Repeticiones</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  placeholder="Ingresa el número de repeticiones"
                  className="w-full p-3 text-lg rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Series */}
        <FormField
          control={form.control}
          name="series"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Series</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  placeholder="Ingresa el número de series"
                  className="w-full p-3 text-lg rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Botón */}
        <Button type="submit" className="w-full py-3 text-lg font-semibold">
          {action === "create" ? "Agregar rutina de ejercicio" : "Actualizar rutina de ejercicio"}
        </Button>
      </form>
    </Form>
  );
};

export default RoutineExerciseForm;
