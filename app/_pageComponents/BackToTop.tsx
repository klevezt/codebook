"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 p-3 rounded-full bg-primary text-white shadow-lg transition-all duration-500 ease-in-out 
        ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        } hover:cursor-pointer hover:opacity-90`}
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}
