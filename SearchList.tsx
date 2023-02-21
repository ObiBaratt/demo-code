import { DisplayResult } from "@/types";
import Link from "next/link";
import { useEffect, useRef } from "react";
import SearchBarItem from "../SearchBarItem/SearchBarItem";

interface ListProps {
  display: DisplayResult[] | [];
  outsideClick: () => void;
}

const SearchList: React.FC<ListProps> = ({ display, outsideClick }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        outsideClick && outsideClick();
      }
    };
    document.addEventListener("click", handleOutsideClick, true);

    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, [outsideClick]);

  return (
    <div id="SearchList" ref={ref}>
      <ul>
        {display.map((item) => {
          return (
            <li key={`${item.id}${item.displayName}`}>
              <Link href={`/${item.type}/${item.id}`} onClick={outsideClick}>
                <SearchBarItem {...item} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchList;
