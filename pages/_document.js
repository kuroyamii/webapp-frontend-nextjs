import Document, { Html, Head, Main, NextScript } from "next/document";

export default class InugamiDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Schoolbell&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
        </body>

        <NextScript />
      </Html>
    );
  }
}
