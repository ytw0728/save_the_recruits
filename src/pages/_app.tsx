import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import 'src/index.css';
import 'normalize.css';

const ProviderApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"/>
            </Head>
            <ThemeProvider theme={{}}>
                <Component {...pageProps}/>
            </ThemeProvider>
        </>
    );
}

export default ProviderApp;