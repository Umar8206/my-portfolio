import { useEffect } from 'react';
import Head from "next/head";
import AOS from "aos";

import 'bootstrap/dist/css/bootstrap.css'
import 'aos/dist/aos.css'

import '../styles/globals.scss'

import '/styles/header.scss'
import '/styles/outer.scss'
import '/styles/gooery.scss'
import '/styles/works.scss'
import '/styles/side-element.scss'
import '/styles/myself.scss'
import '/styles/graphics.scss'
import '/styles/projects.scss'
import '/styles/maps.scss'
import '/styles/views-title.scss'
import '/styles/hover-image.scss'
import '/styles/window-screen.scss'
import '/styles/reviews.scss'
import '/styles/top-scrolled-bar.scss'
import '/styles/contact.scss'
import '/styles/cursor.scss'
import '/styles/afzalimdad.scss'
import '/styles/pre-loader.scss'
import '/styles/certifications.scss'
import { useRouter } from 'next/router';




// ... your imports remain the same

const SITE_NAME = "Muhammad Umar — Software Engineer";
const SITE_URL = "https://muhammad-umar-codes.vercel.app";
const DEFAULT_TITLE = "Muhammad Umar | React Native & Backend Engineer";
const DEFAULT_DESCRIPTION =
  "Software Engineer building scalable mobile apps (React Native) and backend APIs (Node.js/NestJS).";

const DEFAULT_OG_IMAGE = `${SITE_URL}/og.png`; // create this file (step 3)

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle");
    import("aos/dist/aos.js");
    AOS.init();
  }, []);

  const canonicalUrl = `${SITE_URL}${router.asPath === "/" ? "" : router.asPath}`;

  return (
    <>
      <Head>
        {/* Primary */}
        <title>{DEFAULT_TITLE}</title>
        <meta name="description" content={DEFAULT_DESCRIPTION} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0b0b0f" />

        {/* Open Graph */}
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={DEFAULT_TITLE} />
        <meta property="og:description" content={DEFAULT_DESCRIPTION} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={DEFAULT_TITLE} />
        <meta name="twitter:description" content={DEFAULT_DESCRIPTION} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />

        {/* Favicons (you already have these files) */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/assets/uc.png" />

        {/* Optional manifest (you have it in public/) */}
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
