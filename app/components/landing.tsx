'use client'

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { PortableText } from "next-sanity";
import { SwitchContent } from "@/lib/util/contentSwitch";
import { BlurIn } from "@/lib/util/BlurIn";
import { usePageSettled } from "@/lib/util/usePageSettled";
import Intro from "./Intro";
import Image from "next/image";
import Link from "next/link";




export default function Landing({ data }: any) {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, (latest) => {
        const vh = typeof window !== "undefined" ? window.innerHeight : 1000;
        if (latest > vh) return "0%";
        const t = Math.min(latest / 1000, 1);
        return `${t * -10}%`;
    });
    const opacity = useTransform(scrollY, (latest) => {
        const vh = typeof window !== "undefined" ? window.innerHeight : 800;
        if (latest > vh) return 1;
        const t = Math.min(latest / 800, 1);
        return 1 - t;
    });

    const settled = usePageSettled();

    const resourceRef = useRef<HTMLDivElement>(null);
    const [resourceReached, setResourceReached] = useState(false);
    useMotionValueEvent(scrollY, "change", () => {
        if (!resourceRef.current) return;
        setResourceReached(resourceRef.current.getBoundingClientRect().top <= window.innerHeight / 2);
    });

    return (
        <React.Fragment>
            <Intro loader={data.loader} />
            <div className="w-screen h-[100dvh] sticky top-0 z-0 bg-(--black) introStage">
                <motion.div className="w-full h-full stage relative overflow-hidden ">
                    <motion.div className="absolute z-0 w-full h-full top-0 left-0 scale-100" style={{ y, opacity }}>
                        <SwitchContent work={data.cover} title={'landing'} cover={true} />
                        <div
                            className="absolute inset-0 backdrop-blur-2xl backdrop-brightness-125 backdrop-saturate-75 pointer-events-none"
                            style={{
                                maskImage: "radial-gradient(circle at center, transparent 35%, black 85%)",
                                WebkitMaskImage: "radial-gradient(circle at center, transparent 35%, black 85%)",
                            }}
                        />
                    </motion.div>
                    <motion.div className="absolute z-11 w-full h-full top-0 left-0 scale-100" style={{ y }}>
                        <Image alt="image" height={0} width={0} sizes="200vh" src={data.cover.overlay} className={`w-full h-full object-cover`} />

                    </motion.div>
                    <div className="absolute h-1/2 w-screen z-1 bg-linear-to-b from-[#403221] to-transparent opacity-80"></div>
                    <div className="w-full lg:h-full grid grid-cols-12 items-start relative z-10 text-(--white) text-center uppercase [text-shadow:0_2px_12px_rgba(0,0,0,0.35)]">
                        <BlurIn className="col-span-8 col-start-3 pt-[40px] lg:pt-[100px] mb-[20px] lg:mb-0">
                            <div className="w-full mb-4"><PortableText value={data.info.intro} /></div>
                            <h1 className="hero w-full">Steven & Tami</h1>
                        </BlurIn>
                        <BlurIn className="col-span-full lg:col-span-3 lg:col-start-2 flex justify-center items-center text-nowrap mb-[20px] mb:mb-0" delay={0.5}>
                            <PortableText value={data.info.date} />
                        </BlurIn>
                        <BlurIn className="col-span-full lg:col-span-3 lg:col-end-12 flex justify-center items-center text-nowrap" delay={1}>
                            <PortableText value={data.info.location} />
                        </BlurIn>
                    </div>
                </motion.div>

                <div className="pointer-events-none absolute inset-2.5 lg:inset-8 z-20">
                    <motion.span
                        className="absolute top-0 left-0 h-px w-full origin-left bg-(--white)"
                        initial={{ scaleX: 0 }}
                        animate={settled ? { scaleX: 1 } : undefined}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    <motion.span
                        className="absolute top-0 right-0 w-px h-full origin-top bg-(--white)"
                        initial={{ scaleY: 0 }}
                        animate={settled ? { scaleY: 1 } : undefined}
                        transition={{ duration: 0.6, delay: 0.6, ease: "easeInOut" }}
                    />
                    <motion.span
                        className="absolute bottom-0 right-0 h-px w-full origin-right bg-(--white)"
                        initial={{ scaleX: 0 }}
                        animate={settled ? { scaleX: 1 } : undefined}
                        transition={{ duration: 0.6, delay: 1.2, ease: "easeInOut" }}
                    />
                    <motion.span
                        className="absolute bottom-0 left-0 w-px h-full origin-bottom bg-(--white)"
                        initial={{ scaleY: 0 }}
                        animate={settled ? { scaleY: 1 } : undefined}
                        transition={{ duration: 0.6, delay: 1.8, ease: "easeInOut" }}
                    />
                </div>

            </div>
            <div className="w-screen min-h-[200vh] pb-[100vh] z-20 relative">
                <div className={`venue w-full min-h-screen grid grid-cols-12 items-start justify-center pb-[100px] md:mb-0 ${resourceReached ? "bg-(--green) text-(--white)" : "bg-(--white) text-(--red)"}`}>
                    <div className="col-span-full md:col-span-10 lg:col-span-8 col-start-0 md:col-start-1 lg:col-start-3 relative pt-[100px]">
                        <BlurIn alt="image" height={0} width={0} sizes="200vh" src={"/images/frametop.png"} className={`w-full h-auto  object-fill relative`} />
                        <BlurIn className="absolute top-0 left-0 w-full h-full flex items-center pt-[150px] lg:pt-[300px] justify-center" delay={.5}>
                            <Image alt="image" height={0} width={0} sizes="200vh" src={"/images/loc.svg"} className={`translate-x-[-10%] md:translate-x-0 w-auto h-[70px] lg:h-[150px]  object-fill relative`} />

                        </BlurIn>
                    </div>

                    <div className="col-span-full lg:col-span-10 lg:col-start-2 mb-[40px] lg:mb-0">
                        <BlurIn alt="image" height={0} width={0} sizes="200vh" src={data.venue.cover.image} className={`w-full h-auto  object-fill relative`} />

                    </div>
                    <div className="col-span-full md:col-span-10 lg:col-span-8 col-start-0 md:col-start-1 lg:col-start-3 relative pb-[100px]">
                        <BlurIn alt="image" height={0} width={0} sizes="200vh" src={"/images/framebot.png"} className={`translate-y-[100%] lg:translate-y-0 w-full h-auto  object-fill relative`} />
                        <BlurIn delay={.5} className="absolute top-0 left-0 w-full h-full flex flex-col gap-y-[20px] items-center  justify-start  lg:pt-[40px] text-(--red)">
                            <div className="lg:w-1/2 text-center italic richText">
                                <PortableText value={data.venue.description} />
                            </div>
                            {data.venue.website && (
                                <Link href={data.venue.website.link} target="_blank" rel="noopener noreferrer" className="w-[50vw] lg:w-auto  p-4 border-(--red) border uppercase text-center hover:bg-(--red) hover:text-(--white)"><p>{data.venue.website.title}</p></Link>
                            )}

                        </BlurIn>
                    </div>
                </div>
                <div
                    ref={resourceRef}
                    className={`resource w-full min-h-screen grid grid-cols-12 items-start justify-center text-center transition-colors duration-300 ${resourceReached ? "bg-(--green) text-(--white)" : "bg-(--white) text-(--red)"}`}
                >
                    <BlurIn className="py-[100px] col-span-full text-center"><h1>Resources</h1></BlurIn>
                    {data.resources?.map((item: any, index: number) => (
                        <BlurIn key={index} className="col-span-full lg:col-span-6 lg:col-start-4 p-4 flex-col justify-start items-center gap-[40px]">
                            {item.cover?.image && (
                                <Image alt="image" height={0} width={0} sizes="100vh" src={item.cover.image} className={`w-full h-auto  object-fill relative mb-[30px]`} />
                            )}
                            <h2 className="mt-[10px] uppercase mb-8">{item.title}</h2>
                            <div className="richText italic">
                                <PortableText value={item.description} />
                            </div>
                            <div className="col-span-full flex justify-center">
                                {item.website && (
                                    <Link href={item.website.link} target="_blank" rel="noopener noreferrer" className="w-[90vw] lg:w-auto p-4 border-(--white) border uppercase text-center hover:bg-(--red)"><p>{item.website.title}</p></Link>
                                )}
                            </div>
                        </BlurIn>
                    ))}

                </div>

            </div>
        </React.Fragment>
    );
}