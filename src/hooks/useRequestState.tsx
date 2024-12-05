import { useState } from "react";

export const useRequestState = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return { isLoading, setIsLoading, error, setError };
};
