import { useCallback, useEffect, useState } from "react";

export interface UseInViewOptions {
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

export function useInView<T extends HTMLElement = HTMLElement>(
  options: UseInViewOptions = {}
): [(node: T | null) => void, boolean] {
  const { rootMargin = "0px", threshold = 0, once = false } = options;
  const [inView, setInView] = useState(true);
  const [element, setElement] = useState<T | null>(null);

  const ref = useCallback((node: T | null) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (!element || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setInView(isIntersecting);
        if (isIntersecting && once) {
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [element, rootMargin, threshold, once]);

  return [ref, inView];
}

export default useInView;
