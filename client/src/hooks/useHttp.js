import React, { useState, useCallback } from 'react';

function actionErrors(errors) {
    const arr = new Map();
    if(!errors) return arr
    for(let i = 0; i < errors.length; i++) {
        arr.set(errors[i].param, errors[i].msg);
    }
    return arr
}

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
                return { message: (data.message || "Сервер не доступен :("), errors: actionErrors(data.errors) };
            }
            setLoading(false);
            return { message: (data.message || "Успех"), errors: null };

        } catch (error) {
            setLoading(false);
        }
    }, [])

    return { loading, request }
}