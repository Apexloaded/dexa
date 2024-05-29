import LiveMenu from "@/components/Live/LiveMenu";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-svh overflow-hidden relative overscroll-contain">
      <LiveMenu />
      <div className="flex-1 w-4/5">{children}</div>
    </div>
  );
}
