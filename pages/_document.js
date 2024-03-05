import { Html, Head, Main, NextScript } from "next/document";
import React from 'react';
import { CssBaseline } from '@nextui-org/react';

export default function Document() {
  return (
    <Html lang="en">
      <Head >
      {CssBaseline.flush()} 

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export async function  getStaticProps (ctx) {

  const initialProps = await Document.getStaticProps(ctx)

  return {
    ...initialProps,
    styles: React.Children.toArray([initialProps.styles])
  }

 
}