import React from "react";

interface IProps {
  children: JSX.Element[];
}

const Carousel = ({ children }: IProps) => {
  const activeSlide = children.map((slide) => <>{slide}</>);
  return <div>{activeSlide}</div>;
};

export default Carousel;
