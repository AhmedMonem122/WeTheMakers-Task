export default function AdminLayout({
  children,
  sidebar,
  navbar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  navbar: React.ReactNode;
}) {
  return (
    <div className="flex h-full bg-slate-50">
      {sidebar}
      <div className="flex-1 flex flex-col">
        {navbar}
        <main className="flex-1 px-4 py-6 md:px-6">{children}</main>
      </div>
    </div>
  );
}
