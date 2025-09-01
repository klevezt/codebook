import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const TagsForm = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagValue, setTagValue] = useState("");
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
          <Badge variant="secondary" key={tag}>
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default TagsForm;
