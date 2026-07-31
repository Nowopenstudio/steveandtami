import { useEffect, useState } from "react"

export function usePageSettled() {
    const [settled, setSettled] = useState(false)

    useEffect(() => {
        if (document.body.classList.contains('pageSettled')) {
            setSettled(true)
            return
        }

        const observer = new MutationObserver(() => {
            if (document.body.classList.contains('pageSettled')) {
                setSettled(true)
                observer.disconnect()
            }
        })
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })

        return () => observer.disconnect()
    }, [])

    return settled
}
