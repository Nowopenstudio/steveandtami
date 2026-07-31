'use client'

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import Image from "next/image"

const MotionImage = motion.create(Image)

const SLIDE_DURATION = 2800
const SLIDE_TRANSITION = 1.2
const HOLD_ON_LAST = 3200
const FADE_OUT_DURATION = 1.4
const SCALE_END = 1.18

type Slide =
    | { type: "image"; src: string }
    | { type: "text"; content: string }

export default function Intro({ loader }: { loader?: { image: string }[] }) {
    const slides: Slide[] = [
        ...(loader ?? [])
            .filter((item) => item?.image)
            .map((item): Slide => ({ type: "image", src: item.image })),
        { type: "text", content: "You are invited" },
    ]

    const [index, setIndex] = useState(0)
    const [exiting, setExiting] = useState(false)
    const [mounted, setMounted] = useState(true)

    useEffect(() => {
        const isLast = index === slides.length - 1
        const t = setTimeout(() => {
            if (isLast) {
                setExiting(true)
            } else {
                setIndex((i) => i + 1)
            }
        }, isLast ? HOLD_ON_LAST : SLIDE_DURATION)

        return () => clearTimeout(t)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index, slides.length])

    if (!mounted) return null

    const totalScaleDuration =
        ((slides.length - 1) * SLIDE_DURATION + HOLD_ON_LAST + FADE_OUT_DURATION * 1000) / 1000

    return (
        <AnimatePresence onExitComplete={() => {
            setMounted(false)
            document.body.classList.add('pageSettled')
        }}>
            {!exiting && (
                <motion.div
                    className="fixed inset-0 z-[999] bg-(--white) overflow-hidden flex items-center justify-center"
                    exit={{ opacity: 0 }}
                    transition={{ duration: FADE_OUT_DURATION, ease: "easeInOut" }}
                >
                    <motion.div
                        className="w-full h-full flex items-center justify-center p-20 relative"
                        initial={{ scale: 1 }}
                        animate={{ scale: SCALE_END }}
                        transition={{ duration: totalScaleDuration, ease: "linear" }}
                    >
                        {slides.map((slide, i) => {
                            const key = slide.type === "image" ? slide.src : slide.content

                            return (
                                <div key={key + i} className="absolute inset-0 w-full h-full p-20">
                                    <div className="w-full h-full flex items-center justify-center p-20 relative">
                                        {slide.type === "image" ? (
                                            <MotionImage
                                                alt=""
                                                src={slide.src}
                                                fill
                                                priority
                                                sizes="100vw"
                                                className="w-full h-full inset-0 object-contain absolute"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: i === index ? 1 : 0 }}
                                                transition={{ duration: SLIDE_TRANSITION, ease: "easeInOut" }}
                                            />
                                        ) : (
                                            <motion.div
                                                className="w-full h-full flex items-center justify-center"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: i === index ? 1 : 0 }}
                                                transition={{ duration: SLIDE_TRANSITION, ease: "easeInOut" }}
                                            >
                                                <h2 className="uppercase text-center text-(--black) text-(--red)">{slide.content}</h2>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
