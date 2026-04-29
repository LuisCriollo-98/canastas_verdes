// Página de registro

import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Crear cuenta
      </h2>
      <RegisterForm />
    </>
  );
}
