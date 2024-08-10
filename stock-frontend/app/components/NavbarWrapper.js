"use client";

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

const NavbarWrapper = () => {
  const pathname = usePathname();

  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  return <Navbar />;
};

export default NavbarWrapper;
