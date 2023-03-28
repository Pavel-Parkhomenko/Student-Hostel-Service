import React, { useState, useCallback } from 'react';

export default function useHttp() {

    const [loading, setLoading] = useState(false)

    const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {
        setLoading(true);
        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, { method, body, headers })
            const data = await response.json();

            if (!response.ok) {
                setLoading(false);
                if(data.errors) {
                    return { message: (data.message || "Что-то пошло не так"), errors: true };
                } else {
                    return { message: (data.message || "Что-то пошло не так") };
                }
            }
            setLoading(false);
            return data;

        } catch (error) {
            setLoading(false);
        }
    }, [])

    return { loading, request }
};