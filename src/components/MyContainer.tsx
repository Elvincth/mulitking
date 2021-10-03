import React from "react";

const MyContainer = ({
  children,
  className,
  classNameInner,
}: {
  children: React.ReactNode;
  className?: string;
  classNameInner?: string;
}) => {
  return (
    <div className={`min-h-screen font-serif ${className}`}>
      <div
        className={`p-6 mx-auto max-w-[428px] min-h-screen relative overflow-hidden ${classNameInner}`}
      >
        {children}
      </div>
    </div>
  );
};

export default MyContainer;
