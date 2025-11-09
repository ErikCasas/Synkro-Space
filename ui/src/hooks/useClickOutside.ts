import { useEffect, useRef, } from 'react'

export const useClickOutside = (handler: () => unknown) => {
    const nodeRef = useRef<HTMLElement | null>(null)

    const maybeHandler = (event: MouseEvent) => {
        const eventContainsCurrentElement = nodeRef.current?.contains(event.target as Node)

        if (!eventContainsCurrentElement) {
            handler()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', maybeHandler)
        return () => {
            document.removeEventListener('mousedown', maybeHandler)
        }
    })
}
