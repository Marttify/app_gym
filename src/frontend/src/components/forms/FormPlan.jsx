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
import { createPlan, updatePlan } from "../../services/fetch-plan";

// Esquema de validación
const formSchema = z.object({
  nombre: z.string().min(2, { message: "Nombre debe tener al menos 2 caracteres." }),
  precio: z
    .string()
    .transform((val) => parseFloat(val)) // Convierte el valor ingresado a número
    .refine((val) => !isNaN(val) && val > 0, { message: "El precio debe ser un valor positivo." }),
  duracion: z
    .string()
    .transform((val) => parseInt(val, 10)) // Convierte el valor ingresado a número
    .refine((val) => !isNaN(val) && val > 0, { message: "La duración debe ser al menos 1 mes." }),
  descripcion: z.string().min(10, { message: "La descripción debe tener al menos 10 caracteres." }),
});


const ProfileFormPlan = ({ action, plan, id }) => {
  const defaultValues =
    action === "create"
      ? {
          nombre: "",
          precio: 0,
          duracion: 1,
          descripcion: "",
        }
      : { ...plan };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    action == "create" ? await createPlan({data}) : await updatePlan({data, id});
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-[90%] h-max max-w-lg bg-gray-900 text-white p-6 rounded-lg shadow-md m-auto"
      >
        {/* Campo Nombre */}
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Nombre del Plan</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Ingresa el nombre del plan"
                  className="w-full p-3 text-lg rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Precio */}
        <FormField
          control={form.control}
          name="precio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Precio</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  step="0.01"
                  placeholder="Ingresa el precio del plan"
                  className="w-full p-3 text-lg rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Duración */}
        <FormField
          control={form.control}
          name="duracion"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Duración (meses)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Ingresa la duración en meses"
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
                  placeholder="Describe los beneficios del plan"
                  className="w-full p-3 text-lg rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Botón */}
        <Button type="submit" className="w-full py-3 text-lg font-semibold">
          {action === "create" ? "Agregar Plan" : "Actualizar Plan"}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileFormPlan;
