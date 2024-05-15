import React from "react";

function TabsRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex flex-col">{children}</div>;
}
export default TabsRoot;