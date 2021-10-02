import React from "react";

const MyContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`min-h-screen font-sans ${className}`}>
      <div className="mx-auto max-w-[428px] w-full">{children}</div>
    </div>
  );
};

export default MyContainer;
