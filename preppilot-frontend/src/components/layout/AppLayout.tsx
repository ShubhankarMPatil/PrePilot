import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
}

export default function AppLayout({
  children,
}: Props) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-6 bg-gray-50 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}