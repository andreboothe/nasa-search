import { useState, useEffect } from "react";

export const useFecth = (queryString, setData) => {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const queryData = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(queryString);
      const data = await response.json();
      console.log("data", queryString);
      setData(data.collection.items);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (queryString.length) {
      queryData();
    }
  }, [queryString]);

  return { loading, error };
};
