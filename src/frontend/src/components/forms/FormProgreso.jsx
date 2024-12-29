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
import {createProgress, updateProgress} from "../../services/fetch-progress";

// Esquema de validación
const formSchema = z.object({
  usuario_id: z.number().min(1, { message: "Debe seleccionar un usuario válido." }),
  peso: z.number().min(1, { message: "El peso debe ser un valor positivo." }),
  porcentaje_grasa: z.number()
    .min(0, { message: "El porcentaje de grasa debe ser 0 o mayor." })
    .max(100, { message: "El porcentaje de grasa no puede exceder el 100%." }),
  fecha: z.string().regex(
    /^\d{4}-\d{2}-\d{2}$/,
    { message: "La fecha debe estar en formato YYYY-MM-DD." }
  ),
});

const ProgressForm = ({ action, progres, id }) => {
  const defaultValues = action === "create"
    ? {
        usuario_id: "",
        peso: "",
        porcentaje_grasa: "",
        fecha: "",
      }
    : { ...progres };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    action === "create"
      ? createProgress({ data })
      : updateProgress({ data, id });
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
              <FormLabel className="text-lg font-semibold">Usuario ID</FormLabel>
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

        {/* Campo Peso */}
        <FormField
          control={form.control}
          name="peso"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Peso (kg)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  {...field}
                  placeholder="Ingresa el peso en kg"
                  className="w-full p-3 text-lg rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Porcentaje de Grasa */}
        <FormField
          control={form.control}
          name="porcentaje_grasa"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Porcentaje de Grasa</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  {...field}
                  placeholder="Ingresa el porcentaje de grasa"
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
              <FormLabel className="text-lg font-semibold">Fecha</FormLabel>
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
          {action === "create" ? "Registrar Progreso" : "Actualizar Progreso"}
        </Button>
      </form>
    </Form>
  );
};

export default ProgressForm;
