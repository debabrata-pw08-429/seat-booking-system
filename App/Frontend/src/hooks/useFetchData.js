import { useState, useEffect } from "react";

function useFetchData(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const jsonData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (error) {
        setError(error.message);
        setData(null);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
}

export default useFetchData;
