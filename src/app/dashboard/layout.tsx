import localFont from "next/font/local";
import "../globals.css";
import DashboardWrapper from "./dashboardWrapper";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="antialiased">
      <DashboardWrapper>{children}</DashboardWrapper>
    </body>
  );
}
