'use client';

import LoginWidget from '@/widgets/LoginWidget';
import { Flavor } from '@/types/flavors';

export default function Home() {
  const handleLogin = (flavor: Flavor, credentials: { email: string; password: string }) => {
    console.log('Login attempt:', { flavor, credentials });
    // Aquí puedes agregar la lógica de autenticación
  };

  return (
    <LoginWidget onLogin={handleLogin} />
  );
}
