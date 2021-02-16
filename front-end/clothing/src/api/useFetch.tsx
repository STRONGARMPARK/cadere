import { useState, useEffect } from 'react'
import { fetchTypes } from "./constants";
// Currently set initial data as an empty list, which could either be replaced
// with a list or with other data. This is so when you render a list of the 
// data, during the time it is null, it will not give you an error when trying
// to map a list.

/**
 * Write documentation here
 */
export function useFetch(type: fetchTypes, url: string, body?: object) {
  const [data, setData] = useState<any>([]);
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
  }, [body, type, url])

  return { data, loading, error }
}