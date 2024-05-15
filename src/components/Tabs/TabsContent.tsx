import React from "react";

function TabsContent({
  children,
  className,
  value,
  activeTabId,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  value: string;
  activeTabId: string;
}>) {
  return (
    <div
      className={`flex-grow ${
        value == activeTabId ? "block" : "hidden"
      } ${className}`}
    >
      {children}
    </div>
  );
}
export default TabsContent;
