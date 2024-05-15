import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  title: string;
  className?: string;
  value: string;
  onTabChange: (tabId: string) => void;
  activeTabId: string;
  isActiveBg?: boolean;
  isActiveText?: boolean;
}

function TabsHeader({
  title,
  className,
  value,
  onTabChange,
  activeTabId,
  isActiveBg,
  isActiveText,
  ...prop
}: Props) {
  const bg = activeTabId === value && isActiveBg ? "bg-primary/10" : "";
  const textColor = activeTabId === value && isActiveText ? "text-primary" : "";
  return (
    <div
      {...prop}
      onClick={() => onTabChange(value)}
      className={`py-4 font-medium relative select-none ${bg} text-medium text-sm px-5 flex flex-1 items-center justify-center hover:bg-light cursor-pointer ${className}`}
    >
      <p className={`${textColor}`}>{title}</p>
      {activeTabId === value && (
        <div className={`h-1 bg-primary size-full absolute bottom-0`}></div>
      )}
    </div>
  );
}

export default TabsHeader;
