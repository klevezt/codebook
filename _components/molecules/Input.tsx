import { Input } from "@/_components/ui/input";
import { Search } from "lucide-react";
import { Button } from "../ui/button";

const SearchInput = () => {
  return (
    <>
      <Input
        type="text"
        id="search"
        placeholder="Search..."
        className="w-full pl-4 pr-10 py-2 rounded-full border border-primary focus:border-primary focus:ring-primary outline-none"
      />
      <Button className="absolute right-0 top-0 h-full rounded-full">
        <Search className="size-5 md:size-4" />
      </Button>
    </>
  );
};

export { SearchInput };
