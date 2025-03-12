import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { LanguagesView } from 'src/sections/locales/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Languages - ${CONFIG.appName}`}</title>
      </Helmet>

      <LanguagesView />
    </>
  );
}
