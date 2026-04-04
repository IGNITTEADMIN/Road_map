"use client";

import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface Props {
  text?: string;
}

export default function MathRenderer({ text }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current || !text) return;

    try {
      const parts = text.split(/(\$.*?\$)/g);

      ref.current.innerHTML = parts
        .map((part) => {
          if (part.startsWith("$") && part.endsWith("$")) {
            const math = part.slice(1, -1);
            return katex.renderToString(math, {
              throwOnError: false,
            });
          }
          return part;
        })
        .join("");
    } catch {
      ref.current.innerText = text;
    }
  }, [text]);

  return <span ref={ref} />;
}