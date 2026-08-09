'use client'

import { useState } from "react"
import { motion } from "motion/react"

export default function PasswordGate({ password, onUnlock }: { password: string; onUnlock: () => void }) {
    const [value, setValue] = useState("")
    const [error, setError] = useState(false)

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (value.trim() === password) {
            onUnlock()
        } else {
            setError(true)
        }
    }

    return (
        <motion.div
            className="fixed inset-0 z-[999] bg-(--white) flex items-center justify-center p-6"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
        >
            <form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col gap-4 text-center">
                <p className="uppercase text-(--red)">Please Enter Password</p>
                <input
                    autoFocus
                    type="password"
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value)
                        setError(false)
                    }}
                    className="border-(--black) border p-2 text-center"
                />
                {error && <p className="text-(--red) text-sm uppercase">Incorrect password</p>}
                <button type="submit" className="p-2 bg-(--green) text-(--white) uppercase cursor-pointer">
                    Enter
                </button>
            </form>
        </motion.div>
    )
}
