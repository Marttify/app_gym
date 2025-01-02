"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";

import {Button} from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

import {Input} from "../ui/input";
import {createUser, updateUser} from "../../services/fetch-user";

// Esquema de validación
const formSchema = z.object({
  nombre: z.string().min(2, {message: "Nombre debe tener al menos 2 caracteres."}),
  apellido: z.string().min(2, {message: "Apellido debe tener al menos 2 caracteres."}),
  email: z.string().email({message: "Por favor ingresa un email válido."}),
  contraseña: z.string().min(6, {message: "La contraseña debe tener al menos 6 caracteres."}),
  rol: z.string().min(2, {message: "Rol debe tener al menos 2 caracteres."}),
  fecha_registro: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "La fecha debe estar en formato YYYY-MM-DD.",
  }),
  estado: z.boolean(),
});

const ProfileFormUser = ({action, user, id}) => {
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
    : {...user};

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    action == "create" ? createUser({data}) : updateUser({data, id})
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="m-5 flex flex-col gap-4"
      >
        {/* Campos dinámicos */}
        {["nombre", "apellido", "email", "contraseña"].map((fieldName) => (
          <FormField
            key={fieldName}
            control={form.control}
            name={fieldName}
            render={({field}) => (
              <FormItem>
                <FormLabel
                >{fieldName}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={`Ingresa tu ${fieldName}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {/* Campo de rol */}
        <FormField
          control={form.control}
          name="rol"
          render={({field}) => (
            <FormItem>
              <FormLabel 
              >Rol</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange} 
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="administrador">Administrador</SelectItem>
                    <SelectItem value="entrenador">Entrenador</SelectItem>
                    <SelectItem value="cliente">Cliente</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo de Fecha de Registro */}
        <FormField
          control={form.control}
          name="fecha_registro"
          render={({field}) => (
            <FormItem>
              <FormLabel>Fecha registro</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
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
          render={({field}) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Input
                  type="checkbox"
                  className="w-[5%]"
                  {...field}
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Botón */}
        <Button
          type="submit"
          className='mt-5 text-center w-full'
        >
          {action === "create" ? "Agregar Usuario" : "Actualizar Usuario"}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileFormUser;
