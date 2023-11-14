import React, { ReactNode } from "react";
import { Header } from "../header/header";

interface AppLayoutProps {
    children: ReactNode;
  }

export const AppLayout: React.FC<AppLayoutProps> = ({children}) => {
    return (
        <div className="wrapper">
          <Header />
          <main>
            {children}
          </main>
        </div>
      );
}