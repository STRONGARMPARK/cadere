import { useState, useEffect } from 'react'
import { fetchTypes } from "./constants";

export function useFetch(type: fetchTypes, url: string, body?: object) {
  const [data, setData] = useState<any>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let apiBody = {
      method: type,
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(body),
    }

    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(url, apiBody);
        const result = await response.json();
        if (response.ok) {
          setData(result);
        } else {
          setError("There is an error")
        }
        setLoading(false);
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }

    fetchData();
    console.log(data);
  }, [url, type, body, data])

  return { data, loading, error }
}