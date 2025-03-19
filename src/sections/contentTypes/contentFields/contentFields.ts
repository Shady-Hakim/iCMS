import type { ContentField } from './contentFields.type';

export const contentFields: ContentField[] = [
  {
    id: '1',
    name: 'title',
    type: 'text',
    defaultValue: 'Title',
    isRequired: true,
    isPrivate: false,
    minLength: 0,
    maxLength: 10,
  },
  {
    id: '2',
    name: 'tagline',
    type: 'text',
    defaultValue: 'Tag line',
    isRequired: true,
    isPrivate: false,
    minLength: 0,
    maxLength: 10,
  },
];
