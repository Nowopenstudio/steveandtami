'use client'

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { usePageSettled } from "./usePageSettled";

const MotionImage = motion.create(Image);

export function BlurIn({
    children,
    className = "",
    delay = 0,
    duration = 1.5,
    amount = 0.3,
    once = true,
    src,
    alt = "",
    height = 0,
    width = 0,
    sizes,
}: {
    children?: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    amount?: number;
    once?: boolean;
    src?: string;
    alt?: string;
    height?: number;
    width?: number;
    sizes?: string;
}) {
    const settled = usePageSettled();

    const animationProps = {
        initial: { opacity: 0, filter: "blur(20px)", scale: 1.08, y: -24 },
        whileInView: settled
            ? { opacity: 1, filter: "blur(0px)", scale: 1, y: 0 }
            : undefined,
        viewport: { once, amount },
        transition: {
            scale: { duration: duration * 0.6, delay, ease: "easeOut" },
            y: { duration: duration * 0.6, delay, ease: "easeOut" },
            filter: { duration, delay, ease: "easeInOut" },
            opacity: { duration, delay, ease: "easeInOut" },
        },
    } as const;

    if (src) {
        return (
            <MotionImage
                alt={alt}
                height={height}
                width={width}
                sizes={sizes}
                src={src}
                className={className}
                {...animationProps}
            />
        );
    }

    return (
        <motion.div className={className} {...animationProps}>
            {children}
        </motion.div>
    );
}
