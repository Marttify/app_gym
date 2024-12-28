"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "./ui/zod"

import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import api from "../services/api"

// Ampliamos el esquema con más campos
const formSchema = z.object({
  nombre: z.string().min(2, {
    message: "Nombre debe tener al menos 2 caracteres.",
  }),
  apellido: z.string().min(2, {
    message: "Apellido debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor ingresa un email válido.",
  }),
  contraseña: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres.",
  }),
  rol: z.string().min(2, {
    message: "Rol debe tener al menos 2 caracteres.",
  }),
  fecha_registro: z.string(),
  estado: z.boolean(),
})

const ProfileFormUser = ({length}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "Default",
      apellido: "Default",
      email: "Default@gmail.com",
      contraseña: "DefaultDefault",
      rol: "Default",
      fecha_registro: "",
      estado: false,
    },
  })

  const onSubmit = async (data) => {
    console.log("🧐 ~ onSubmit ~ data:", data)
    
    // Agregar el ID al objeto 'data'
    const dataWithId = {
      ...data,
      id: length + 1, // O cualquier lógica que uses para generar el ID
    }
    try {
      const response = await api.post('/create-usuario', dataWithId)

      if (!response.ok) {
        throw new Error('Error al crear el usuario');
      }
      console.log("🧐 ~ Respuesta del servidor:", response.data); // Muestra la respuesta del servidor

      const newUser = await response.json()
      console.log("Usuario creado con éxito:", newUser)
    } catch (error) {
      console.error('Error al crear el usuario:', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-[90%] overflow-y-auto max-w-lg h-[90%] bg-gray-900 text-white p-6 rounded-lg shadow-md m-auto">

        {/* Campo de Nombre */}
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Nombre</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ingresa tu nombre"
                  {...field}
                  className="w-full p-3 text-lg rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </FormControl>
              <FormDescription className="text-sm text-gray-400">
                Tu primer nombre.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo de Apellido */}
        <FormField
          control={form.control}
          name="apellido"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Apellido</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ingresa tu apellido"
                  {...field}
                  className="w-full p-3 text-lg rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </FormControl>
              <FormDescription className="text-sm text-gray-400">
                Tu apellido.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo de Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Ingresa tu email"
                  {...field}
                  className="w-full p-3 text-lg rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </FormControl>
              <FormDescription className="text-sm text-gray-400">
                Este será el correo donde recibirás notificaciones.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo de Contraseña */}
        <FormField
          control={form.control}
          name="contraseña"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Contraseña</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  {...field}
                  className="w-full p-3 text-lg rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </FormControl>
              <FormDescription className="text-sm text-gray-400">
                Tu contraseña debe tener al menos 6 caracteres.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo de Rol */}
        <FormField
          control={form.control}
          name="rol"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">Rol</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ingresa tu rol"
                  {...field}
                  className="w-full p-3 text-lg rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </FormControl>
              <FormDescription className="text-sm text-gray-400">
                Define tu rol en el sistema.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  className="w-full p-3 text-lg rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </FormControl>
              <FormDescription className="text-sm text-gray-400">
                Fecha en que te registraste en el sistema.
              </FormDescription>
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
                <Input
                  type="checkbox"
                  {...field}
                  className="w-full p-3 text-lg rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </FormControl>
              <FormDescription className="text-sm text-gray-400">
                Marca si el usuario está activo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Botón Submit */}
        <Button
          type="submit"
          className="w-full py-3 text-lg font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Agregar usuario
        </Button>
      </form>
    </Form>
  )
}

export default ProfileFormUser;
