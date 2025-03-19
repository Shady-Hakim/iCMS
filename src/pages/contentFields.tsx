import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { CONFIG } from 'src/config-global';

import { contentTypes } from 'src/sections/contentTypes/contentTypes';
import { ContentFieldsView } from 'src/sections/contentTypes/contentFields/view';

// ----------------------------------------------------------------------

export default function Page() {
  const { contentTypeId } = useParams();
  const contentType = contentTypes.find((type) => type.id === contentTypeId);

  return (
    <>
      <Helmet>
        <title> {`${contentType?.displayName} Fields - ${CONFIG.appName}`}</title>
      </Helmet>
      {contentType && <ContentFieldsView contentType={contentType} />}
    </>
  );
}
