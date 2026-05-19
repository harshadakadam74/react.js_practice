import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        if (!currency) return;

        fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("API Error");
                }
                return res.json();
            })
            .then((res) => {
                setData(res[currency]);
            })
            .catch((err) => {
                console.error("Fetch error:", err);
                setData({});
            });

    }, [currency]);

    return data;
}

export default useCurrencyInfo;