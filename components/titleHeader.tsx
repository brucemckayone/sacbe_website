import React from "react";

interface Props {
  title: string;
  className?: string;
}
const SectionHeader: React.FC<Props> = ({ title, className }) => {
  return (
    <h1 className={`mx-5 md:mx-20 my-20 ${className} text-center`}>{title}</h1>
  );
};

export default SectionHeader;
