import { SessionProvider } from 'next-auth/react';
import '../i18n'; // Import the i18n configuration
import '../styles/globals.css'; // Import global styles

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;