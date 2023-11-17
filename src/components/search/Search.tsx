import React from "react";
import {Input} from "@nextui-org/react";
import {SearchIcon} from "./SearchIcon";

interface SearchProps{
  value: string;
  onChange: (value: string) => void;
  onReset: () => void;
}

const Search = (props: SearchProps) => {
  return (
    <>
      <Input
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        label="Search"
        isClearable
        radius="lg"
        classNames={{
          label: "text-white dark:text-white/90",
          input: [
            "bg-transparent",
            "text-default-400/50 dark:text-white/90",
            "placeholder:text-default-400/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "bg-[#313131]",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-[#313131]",
            "dark:hover:bg-[#313131]",
            "group-data-[focused=true]:bg-[#313131]",
            "dark:group-data-[focused=true]:bg-[#313131]",
            "!cursor-text",
          ],
        }}
        placeholder="Type to search..."
        startContent={
          <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
      />
    </>
  );
};

export default Search;
