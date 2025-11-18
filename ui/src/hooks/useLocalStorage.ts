import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const useLocalStorage = <T>(
    key: string,
    initialValue: T
): [T, Dispatch<SetStateAction<T>>] => {
    const [storedValue, setStoredValue] = useState<T>(initialValue)
    const [firstLoadDone, setFirstLoadDone] = useState(false)

    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key)
            if (item !== null) {
                // si es un string plano (no JSON válido), no lo parsees
                try {
                    setStoredValue(JSON.parse(item))
                } catch {
                    setStoredValue(item as T)
                }
            }
        } catch (error) {
            console.error("Error reading localStorage:", error)
            setStoredValue(initialValue)
        } finally {
            setFirstLoadDone(true)
        }
    }, [key])

    useEffect(() => {
        if (!firstLoadDone) return
        try {
            const value =
                typeof storedValue === "string"
                    ? storedValue // evita comillas dobles
                    : JSON.stringify(storedValue)

            window.localStorage.setItem(key, value)
        } catch (error) {
            console.error("Error writing localStorage:", error)
        }
    }, [storedValue, firstLoadDone, key])

    return [storedValue, setStoredValue]
}