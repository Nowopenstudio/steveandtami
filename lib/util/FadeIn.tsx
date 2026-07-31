'use client'

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

const MotionImage = motion.create(Image);

export function FadeIn({
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
    const animationProps = {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once, amount },
        transition: { duration, delay, ease: "easeInOut" },
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
