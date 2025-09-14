import { Input } from "@/_components/ui/input";
import { Search } from "lucide-react";

const SearchInput = () => {
  return (
    <>
      <Input
        type="text"
        id="search"
        placeholder="Search..."
        className="w-full pl-4 pr-10 py-2 rounded-full border border-primary focus:border-primary focus:ring-primary outline-none"
      />
      <Search className="size-5 md:size-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
    </>
  );
};

export { SearchInput };
