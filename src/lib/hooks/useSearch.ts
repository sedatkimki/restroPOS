/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from "lodash";
import { useEffect, useState } from "react";

interface SearchableObject {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [key: string]: any;
}

const useSearch = <T extends SearchableObject>(
  data: T[],
  searchValue: string,
  keysToSearch: string[],
  debounceTime = 500,
) => {
  const [searchResults, setSearchResults] = useState<T[]>([]);

  useEffect(() => {
    const debouncedSearch = _.debounce((value: string) => {
      const filteredData = data.filter((item) => {
        for (const key of keysToSearch) {
          if (Object.prototype.hasOwnProperty.call(item, key)) {
            if (String(item[key]).toLowerCase().includes(value.toLowerCase())) {
              return true;
            }
          }
        }
        return false;
      });
      setSearchResults(filteredData);
    }, debounceTime);

    debouncedSearch(searchValue);

    return () => {
      debouncedSearch.cancel();
    };
  }, [data, searchValue, keysToSearch, debounceTime]);

  return searchResults;
};

export default useSearch;
