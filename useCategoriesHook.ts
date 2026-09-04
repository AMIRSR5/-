import { useEffect, useState } from "react";
import type { Category } from "./types.ts";
import { fetchCategories } from "./categoriesService.ts";

export function useCategories(onlyActive = true) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetchCategories(onlyActive)
      .then((data) => alive && setCategories(data))
      .catch((e) => console.error(e))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [onlyActive]);

  return { categories, loading };
}
