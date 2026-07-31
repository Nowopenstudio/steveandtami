import { MuxVideoBG } from "./muxPlayer";
import Image from "next/image";

export function SwitchContent({ work, title, cover }: any) {
  if (!work) return null


  if (work.video) {
    return <div className={`w-full noControl ${cover ? "object-cover" : "object-fill"}`}> <MuxVideoBG playbackId={work.video.asset.playbackId} title={title} /></div>


  }

  if (work.image) return <Image alt="image" height={0} width={0} sizes="200vh" src={work.image} className={`w-full ${cover ? "h-full object-cover" : "object-fill"}`} />


}

