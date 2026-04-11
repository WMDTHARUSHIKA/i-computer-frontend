import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F1F0E9]">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}