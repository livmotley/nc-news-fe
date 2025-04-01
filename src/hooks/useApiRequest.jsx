import { useEffect, useState } from "react";

    
function useApiRequest(apiFunction, property, ...args) {    
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        setIsError(false);
        apiFunction(...args)
        .then((response) => {
            setData(response.data[property]);
            setIsLoading(false);
        })
        .catch(() => {
            setIsError(true);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }, [...args]);

    return { data, isLoading, isError };
};

export default useApiRequest;