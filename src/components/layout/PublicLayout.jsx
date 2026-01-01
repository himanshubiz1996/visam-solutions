import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import MouseFollower from '../MouseFollower';

export default function PublicLayout() {
  return (
    <>
      <MouseFollower />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
