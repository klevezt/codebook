import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import React from "react";

const Tags = ({ tags }: { tags?: string[] }) => {
  if (!tags) return null;
  return (
    tags.length > 0 && (
      <div className="flex flex-wrap items-center gap-2 text-xs mt-10">
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <Badge
              variant="secondary"
              className="flex justify-between items-center text-md "
              key={tag}
            >
              {tag}
              <span className="hover:cursor-pointer text-md">
                <X size="12" />
              </span>
            </Badge>
          ))}
        </div>
      </div>
    )
  );
};

export default Tags;
