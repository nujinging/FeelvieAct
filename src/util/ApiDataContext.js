// ApiDataContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const ApiDataContext = createContext();

export function useApiData() {
    return useContext(ApiDataContext);
}

export function ApiDataProvider({ children }) {
    const [apiData, setApiData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchApiData() {
            try {
                const response = await fetch('https://api.example.com/data');
                if (!response.ok) {
                    throw new Error('API 요청이 실패했습니다.');
                }
                const data = await response.json();
                setApiData(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }

        fetchApiData();
    }, []);

    return (
        <ApiDataContext.Provider value={{ apiData, loading, error }}>
            {children}
        </ApiDataContext.Provider>
    );
}
