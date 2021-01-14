import { useEffect, useState } from "react";

const useCreateRepairment = (input) => {
  const [data, setData] = useState(null);
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/repairments/insert`;

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      fetch(url, requestOptions)
        .then(async (response) => {
          const data = await response.json();
          console.log(response);
          if (!response.ok) {
            const error = (data && data.error) || response.status;
            throw new Error(data.error);
          }
          if (response.ok && data) {
            setData(data);
          }
        })
        .catch((e) => {
          console.log(e.toString());
          setIsError(true);
        });

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return { data, isLoading, isError };
};

export { useCreateRepairment };
