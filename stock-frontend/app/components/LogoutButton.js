"use client";

import { useRouter } from 'next/navigation';
import { logout } from '../utils/auth'; // Update the path as needed

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default LogoutButton;
