import React from "react";

function Aside({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-full hidden lg:inline md:w-1/3">{children}</div>;
}

export default Aside;
