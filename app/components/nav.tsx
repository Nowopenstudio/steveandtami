'use client'

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { useLenis } from "lenis/react"
import { AnimatePresence } from "motion/react"
import React from "react"
import Link from "next/link"
import RsvpForm from "./RsvpForm"

export default function Nav({ active }: any) {
    const pathname = usePathname()
    const lenis = useLenis()
    const [workMode, setWorkMode] = useState(false)
    const prevPathname = useRef<string | undefined>(undefined)
    const [rsvpOpen, setRsvpOpen] = useState(false)



    return (
        <React.Fragment>
            <div className="contactBut bg-(--green) fixed z-50  w-[90vw] translate-x-[-50%] sm:translate-x-0 left-1/2  sm:w-auto sm:left-[60px] top-[20px] sm:top-[60px] uppercase p-2  text-(--white) cursor-pointer hover:bg-(--green) text-center" onClick={() => lenis?.scrollTo('#info')}><div className="py-2 px-15 border-2 border-(--white)">
                <p>Contact Us</p>
            </div></div>
            {active && <div className="fixed z-50 right-1/2 w-[90vw] translate-x-[50%] lg:translate-x-0 lg:w-auto lg:right-[60px] bottom-[20px] lg:bottom-[unset] lg:top-[60px] uppercase p-2 bg-(--green) text-(--white) cursor-pointer hover:bg-(--red) text-center" onClick={() => setRsvpOpen(true)}><div className="py-2 px-15 border-2 border-(--white)">
                <p>RSVP</p>
            </div></div>}
            <AnimatePresence>
                {rsvpOpen && <RsvpForm onClose={() => setRsvpOpen(false)} />}
            </AnimatePresence>
        </React.Fragment>
    );
}
