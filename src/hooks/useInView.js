import { useEffect, useRef, useState } from "react";

export default function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);      // mark as visible
          observer.unobserve(node); // only animate once
        }
      },
      {
        threshold: 0.15,
        ...options,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [options]);

  return [ref, inView];
}
