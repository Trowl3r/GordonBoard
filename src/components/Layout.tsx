import { ScrollRestoration, Outlet } from 'react-router-dom';
import Navbar from './ui/NavBar';

export default function Layout() {
  return (
    <>
      <Navbar />
      <ScrollRestoration />
      <Outlet />
    </>
  );
} 