import { MutableRefObject, useEffect, useRef } from 'react'

export const useClickOutside = (handler: VoidFunction): MutableRefObject<HTMLElement> => {

    const nodeRef = useRef<HTMLElement | null>(null)

    const maybeHandler = () => {
        const eventIsInElement = nodeRef.current?.contains(event?.target as Node)

        if (!eventIsInElement) {
            handler()
        }
    }

    useEffect(() => {

        document.addEventListener('mousedown', maybeHandler)

        return () => {
            document.removeEventListener('mousedown', maybeHandler)
        }
    })

    return nodeRef as MutableRefObject<HTMLElement>
}