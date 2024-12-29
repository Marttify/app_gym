"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {createUser, updateUser} from "../../services/fetch-user";

// Esquema de validación
const formSchema = z.object({
  nombre: z.string().min(2, { message: "Nombre debe tener al menos 2 caracteres." }),
  apellido: z.string().min(2, { message: "Apellido debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor ingresa un email válido." }),
  contraseña: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
  rol: z.string().min(2, { message: "Rol debe tener al menos 2 caracteres." }),
  fecha_registro: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "La fecha debe estar en formato YYYY-MM-DD.",
  }),
  estado: z.boolean(),
});

const ProfileFormUser = ({ action, user, id }) => {
  const defaultValues = action === "create"
    ? {
        nombre: "",
        apellido: "",
        email: "",
        contraseña: "",
        rol: "",
        fecha_registro: "",
        estado: false,
      }
    : { ...user };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    action == "create" ? createUser({data}) : updateUser({ data, id })
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-[90%] max-w-lg bg-gray-900 text-white p-6 rounded-lg shadow-md m-auto"
      >
        {/* Campos dinámicos */}
        {["nombre", "apellido", "email", "contraseña", "rol"].map((fieldName) => (
          <FormField
            key={fieldName}
            control={form.control}
            name={fieldName}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">{fieldName}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={`Ingresa tu ${fieldName}`}
                    className="w-full p-3 text-lg rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {/* Campo de Fecha de Registro */}
        <FormField
          control={form.control}
          name="fecha_registro"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Fecha de Registro</FormLabel>
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
          {action === "create" ? "Agregar Usuario" : "Actualizar Usuario"}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileFormUser;
