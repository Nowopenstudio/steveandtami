import type { Metadata } from "next";
import "./globals.css";
import SmoothScrolling from "@/lib/util/SmoothScrolling";
import Nav from "./components/nav";
import { getData } from "@/lib/util/sanity";




export const metadata: Metadata = {
  title: "Steven & Tami",
  description: "Save the Date",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const query = await getData(`{
      'data': *[_type == 'settings'][0]{
        rsvpActive
      }
    }`)
  const { data } = query.data


  return (
    <html lang="en"
    >


      <SmoothScrolling>

        <body className="w-screen  bg-(--white)">
          {/* <Grid /> */}
          <Nav active={data.rsvpActive} />
          {children}
        </body>
      </SmoothScrolling>
    </html>
  );
}
