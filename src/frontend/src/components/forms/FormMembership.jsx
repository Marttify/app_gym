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
  fecha_inicio: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "La fecha de inicio debe estar en formato YYYY-MM-DD.",
  }),
  fecha_fin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "La fecha de fin debe estar en formato YYYY-MM-DD.",
  }),
  estado: z.string()
});


const MembershipForm = ({ action, membership, id }) => {
  const defaultValues = action === "create"
    ? {
        fecha_inicio: "",
        fecha_fin: "",
        estado: "",
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
        {/* Campo de Estado */}
        <FormField
          control={form.control}
          name="estado"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Estado</FormLabel>
              <FormControl>
                <input
                  type="checkbox"
                  {...field}
                  className="w-5 h-5 text-blue-500 border-gray-700 rounded focus:ring-2 focus:ring-blue-500"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
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
