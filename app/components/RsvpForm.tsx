'use client'

import { useState } from "react"
import { motion } from "motion/react"

export default function RsvpForm({ onClose }: { onClose: () => void }) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [plusOne, setPlusOne] = useState(false)
    const [guestFirstName, setGuestFirstName] = useState("")
    const [guestLastName, setGuestLastName] = useState("")
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
    const [error, setError] = useState("")

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setStatus("submitting")
        setError("")

        try {
            const res = await fetch("/api/rsvp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    plusOne,
                    guest: plusOne ? { firstName: guestFirstName, lastName: guestLastName } : undefined,
                }),
            })

            const result = await res.json()

            if (!res.ok) {
                throw new Error(result.error || "Something went wrong. Please try again.")
            }

            setStatus("success")
        } catch (err: any) {
            setStatus("error")
            setError(err.message || "Something went wrong. Please try again.")
        }
    }

    return (
        <motion.div
            className="fixed inset-0 z-100 flex items-center justify-center bg-(--black)/70 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="w-full max-w-md bg-(--white) text-(--black) p-8 relative"
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 12 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 uppercase text-sm cursor-pointer"
                    aria-label="Close"
                >
                    Close
                </button>

                {status === "success" ? (
                    <div className="py-8 text-center uppercase">
                        <p>Thank you for your RSVP!</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
                        <h2 className="uppercase text-center mb-2">RSVP</h2>

                        <label className="flex flex-col gap-1 text-sm uppercase">
                            First Name
                            <input
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="border-(--black) border p-2"
                            />
                        </label>

                        <label className="flex flex-col gap-1 text-sm uppercase">
                            Last Name
                            <input
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="border-(--black) border p-2"
                            />
                        </label>

                        <label className="flex flex-col gap-1 text-sm uppercase">
                            Email
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border-(--black) border p-2"
                            />
                        </label>

                        <label className="flex items-center gap-2 text-sm uppercase">
                            <input
                                type="checkbox"
                                checked={plusOne}
                                onChange={(e) => setPlusOne(e.target.checked)}
                            />
                            Bringing a plus one
                        </label>

                        {plusOne && (
                            <div className="flex flex-col gap-4 border-t border-(--gray) pt-4">
                                <label className="flex flex-col gap-1 text-sm uppercase">
                                    Guest First Name
                                    <input
                                        required
                                        value={guestFirstName}
                                        onChange={(e) => setGuestFirstName(e.target.value)}
                                        className="border-(--black) border p-2"
                                    />
                                </label>
                                <label className="flex flex-col gap-1 text-sm uppercase">
                                    Guest Last Name
                                    <input
                                        required
                                        value={guestLastName}
                                        onChange={(e) => setGuestLastName(e.target.value)}
                                        className="border-(--black) border p-2"
                                    />
                                </label>
                            </div>
                        )}

                        {status === "error" && <p className="text-(--red) text-sm">{error}</p>}

                        <div className="p-2 bg-(--green) flex justify-center items-center">
                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className="w-full h-full p-2 border-(--white) border text-(--white) uppercase disabled:opacity-50 cursor-pointer"
                            >
                                {status === "submitting" ? "Submitting..." : "Submit RSVP"}
                            </button>
                        </div>
                    </form>
                )}
            </motion.div>
        </motion.div>
    )
}
