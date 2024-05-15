import React from "react";
import clsx from "clsx";

export default function Label({
  isRequired = false,
  title,
  isMargin = false,
  isLowerCase = false,
}: {
  isRequired?: boolean;
  title: string;
  isMargin?: boolean;
  isLowerCase?: boolean;
}) {
  const caseClass = isLowerCase ? "capitalize" : "uppercase";
  return (
    <p
      className={clsx(`text-xs ${caseClass} text-dark/90 font-semibold`, {
        "mb-2": isMargin,
      })}
    >
      {title}
      {isRequired && <span className="text-primary">*</span>}
    </p>
  );
}
