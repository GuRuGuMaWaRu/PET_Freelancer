import { useRef, useEffect, RefObject, MutableRefObject } from "react";

const useOutsideClick = <T extends HTMLElement>(
  callback: () => void
): RefObject<T> => {
  const ref: MutableRefObject<T | null> = useRef<T>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [ref, callback]);

  return ref;
};

export { useOutsideClick };
