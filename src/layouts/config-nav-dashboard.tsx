import { Icon } from '@iconify/react';

import { Label } from 'src/components/label';

// ----------------------------------------------------------------------

const icon = (name: string) => <Icon icon={`mdi:${name}`} width="100%" height="100%" />;

export const navData = [
  {
    title: 'Settings',
    items: [
      {
        title: 'Dashboard',
        path: '/',
        icon: icon('chart-line'),
      },

      {
        title: 'Languages',
        path: '/languages',
        icon: icon('translate'),
      },
      {
        title: 'Content types',
        path: '/content-types',
        icon: icon('building'),
      },
    ],
  },
  {
    title: 'Content Management',
    items: [
      {
        title: 'User',
        path: '/user',
        icon: icon('account'),
      },
      {
        title: 'Product',
        path: '/products',
        icon: icon('cart'),
        info: (
          <Label color="error" variant="inverted">
            +3
          </Label>
        ),
      },
      {
        title: 'Blog',
        path: '/blog',
        icon: icon('text-long'),
      },
    ],
  },
  {
    title: 'Others',
    items: [
      {
        title: 'Sign in',
        path: '/sign-in',
        icon: icon('lock'),
      },
      {
        title: 'Not found',
        path: '/404',
        icon: icon('alert-circle'),
      },
    ],
  },
];
