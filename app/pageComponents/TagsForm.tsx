import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import React, { useState } from "react";

const TagsForm = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagValue, setTagValue] = useState("");

  const removeTag = (tag: string) => setTags((prev) => prev.filter((el) => el !== tag));

  return (
    <div className="flex flex-col gap-4">
      <Input
        id="tags"
        placeholder="Add tag and hit enter"
        value={tagValue}
        onChange={(e) => setTagValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setTags((prev) => [...prev, tagValue]);
            setTagValue("");
          }
        }}
      />
      <div className="flex gap-2">
        {tags.map((tag) => (
          <Badge
            variant="secondary"
            className="flex justify-between items-center text-md "
            key={tag}
          >
            {tag}
            <span className="hover:cursor-pointer text-md" onClick={() => removeTag(tag)}>
              <X size="12" />
            </span>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default TagsForm;
