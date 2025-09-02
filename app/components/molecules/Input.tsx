import { Input } from "@/components/ui/input";

const SearchInput = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search..."
          className="w-40 focus:w-100 transition-all duration-300 ease-in-out pl-4 pr-10 py-2 rounded-full border border-primary focus:border-primary focus:ring-primary outline-none"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke={`var(--primary)`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
      </div>
    </div>
  );
};

export { SearchInput };
