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
import {createMembership, updateMembership} from "../../services/fetch-membership";

// Esquema de validación
const formSchema = z.object({
  usuario_id: z
    .string()
    .transform((val) => parseInt(val, 10))  // Convierte la cadena a número
    .refine((val) => !isNaN(val), { message: "ID de usuario debe ser un número positivo." }),
  plan_id: z
    .string()
    .transform((val) => parseInt(val, 10))  // Convierte la cadena a número
    .refine((val) => !isNaN(val), { message: "ID de plan debe ser un número positivo." }),
  fecha_inicio: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "La fecha de inicio debe estar en formato YYYY-MM-DD.",
  }),
  fecha_fin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "La fecha de fin debe estar en formato YYYY-MM-DD.",
  }),
});


const MembershipForm = ({ action, membership, id }) => {
  const defaultValues = action === "create"
    ? {
        usuario_id: 0,
        plan_id: 0,
        fecha_inicio: "",
        fecha_fin: "",
      }
    : { ...membership };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    action === "create"
      ? createMembership({ data })
      : updateMembership({ data, id });
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

        {/* Campo Plan ID */}
        <FormField
          control={form.control}
          name="plan_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">ID del Plan</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  placeholder="Ingresa el ID del plan"
                  className="w-full p-3 text-lg rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Fecha de Inicio */}
        <FormField
          control={form.control}
          name="fecha_inicio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Fecha de Inicio</FormLabel>
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

        {/* Campo Fecha de Fin */}
        <FormField
          control={form.control}
          name="fecha_fin"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Fecha de Fin</FormLabel>
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
          {action === "create" ? "Agregar Membresía" : "Actualizar Membresía"}
        </Button>
      </form>
    </Form>
  );
};

export default MembershipForm;
