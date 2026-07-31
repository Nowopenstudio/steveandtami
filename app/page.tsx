import { getData } from "@/lib/util/sanity";
import React from "react";
import Landing from "./components/landing";


export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const query = await getData(`{
    'data': *[_type == 'settings'][0]{
      meta{
        title,
        description,
        keywords,
        "image": image.asset->url
      },
      loader[]{
        "image": asset->url
      },
      cover{
        "image": image.asset->url,
        "overlay": overlay.asset->url,
        "vid": video.asset->playbackId,
        "ratio": video.asset->data.aspect_ratio
      },
      info,
      gallery[]{
        "image": asset->url
      },
      venue{
        title,
        website,
        description,
        cover{
          "image": image.asset->url,
          "vid": video.asset->playbackId,
          "ratio": video.asset->data.aspect_ratio
        },
        attr[]{
          title,
          description,
          cover{
            "image": image.asset->url,
            "vid": video.asset->playbackId,
            "ratio": video.asset->data.aspect_ratio
          }
        }
      },
      resources[]{
        title,
        description,
        website,
        cover{
          "image": image.asset->url,
          "vid": video.asset->playbackId,
          "ratio": video.asset->data.aspect_ratio
        }
      },
      endcap{
        "image": image.asset->url,
        "vid": video.asset->playbackId,
        "ratio": video.asset->data.aspect_ratio
      }
    }
  }`)
  const { data } = query.data
  return (
    <React.Fragment>
      <Landing data={data} />
    </React.Fragment>
  );
}


export async function generateMetadata() {
  const query = await getData(`{
    'data': *[_type == 'settings'][0]{
      meta{
        title,
        description,
        keywords,
        "image": image.asset->url
      }
    }
  }`)
  const { data } = query.data
  return {
    title: `${data.meta.title}`,
    keywords: `${data.meta.keywords}`,
    description: `${data.meta.description}`,
    openGraph: {
      images: data.meta.image
    }
  };
}