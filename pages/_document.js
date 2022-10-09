import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    // Thêm vào `data-theme`
    <Html data-theme="dark">
      <Head></Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
