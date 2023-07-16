import { useState, useEffect } from "react";

const useDataPosting = (url, data) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const postData = async () => {
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        };

        const response = await fetch(url, requestOptions);
        const responseData = await response.json();

        setResponse(responseData);
      } catch (error) {
        setError(error);
      }
    };

    postData();
  }, [url]);

  return { response, error };
};

export default useDataPosting;
