import React from "react";
import { matchSorter } from "match-sorter";

import { useThrottle } from "shared/lib";

function useItemMatch<T>(items: T[], term: string) {
  const throttledTerm = useThrottle(term, 100);
  return React.useMemo(
    () =>
      throttledTerm.trim() === ""
        ? null
        : matchSorter(items, throttledTerm, {
            keys: ["name"],
          }),
    [items, throttledTerm],
  );
}

export { useItemMatch };
