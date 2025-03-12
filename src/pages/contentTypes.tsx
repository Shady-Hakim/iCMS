import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ContentTypesView } from 'src/sections/contentTypes/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Content Types - ${CONFIG.appName}`}</title>
      </Helmet>

      <ContentTypesView />
    </>
  );
}
