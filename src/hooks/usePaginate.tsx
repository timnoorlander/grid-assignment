import { useEffect, useRef, useState } from "react";

type Props = {
  isDisabled: boolean;
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
};

const usePaginate = ({
  isDisabled,
  root = null,
  rootMargin = "0px",
  threshold = 1,
}: Props): {
  sentinelRef: React.RefObject<HTMLDivElement>;
  pageNumber: number;
} => {
  const [pageNumber, setPageNumber] = useState(1);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isDisabled) {
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
          }
        });
      },
      { root, rootMargin, threshold }
    );

    const sentinelElement = sentinelRef.current;

    if (sentinelElement) {
      observer.observe(sentinelElement);
    }

    return () => {
      if (sentinelElement) {
        observer.unobserve(sentinelElement);
      }
    };
  }, [isDisabled, root, rootMargin, threshold]);

  return { sentinelRef, pageNumber };
};

export default usePaginate;
