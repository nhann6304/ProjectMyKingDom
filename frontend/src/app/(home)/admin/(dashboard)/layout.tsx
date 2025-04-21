import TopNavAdmin from "@/layouts/admin/TopNavAdmin";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNavAdmin title="Dashboard" />
      <main>{children}</main>
    </>
  );
}
