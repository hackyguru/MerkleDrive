import "tailwindcss/tailwind.css";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId="ZT3491rrL0EhISf8r6lLSeapIIhEcrNcfTtdQXKV"
      serverUrl="https://lbpoky90wlek.usemoralis.com:2053/server"
    >
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
