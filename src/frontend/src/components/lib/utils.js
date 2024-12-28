// utils/cn.js (o un archivo similar en tu proyecto)
export function cn(...classes) {
  return classes.filter(Boolean).join(' '); // Combina las clases no vacías
}
