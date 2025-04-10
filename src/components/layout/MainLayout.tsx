
import { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-secondary/20">
          {children}
        </main>
      </div>
    </div>
  );
}
