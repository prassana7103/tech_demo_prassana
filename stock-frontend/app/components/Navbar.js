"use client";

import Link from 'next/link';
import LogoutButton from './LogoutButton'; // Update the path as needed
import './Navbar.css';

export default function Navbar() {
  return (
    <nav>
      <Link href="/daily">Daily Data</Link>
      <Link href="/monthly">Monthly Data</Link>
      <Link href="/yearly">Yearly Data</Link>
      <Link href="/top-gainers-losers">Top Gainers/Losers</Link>
      <Link href="/stocklist">All Stocks</Link>
      <LogoutButton /> {/* Add the Logout button */}
    </nav>
  );
}
