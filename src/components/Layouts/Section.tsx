import React from "react";

function Section({
  children,
  isFull = false,
  className,
}: Readonly<{
  children: React.ReactNode;
  isFull?: boolean;
  className?: string;
}>) {
  return isFull ? (
    <div className={`${className} overflow-scroll h-screen flex flex-col`}>
      {children}
    </div>
  ) : (
    <div
      className={`${className} w-full md:w-3/4 lg:w-2/3 h-screen overflow-scroll scrollbar-hide flex flex-col border-r border-light`}
    >
      {children}
    </div>
  );
}

export default Section;
