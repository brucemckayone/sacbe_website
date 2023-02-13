import { useState, useMemo, useEffect, useRef } from "react";

export default function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);

  // const observer = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return isIntersecting;
}
