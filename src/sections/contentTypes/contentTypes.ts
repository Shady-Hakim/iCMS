import type { ContentType } from './contentTypes.type';

export const contentTypes: ContentType[] = [
  {
    id: '1',
    name: 'posts',
    displayName: 'Posts',
    singular: 'post',
    plural: 'posts',
    numberOfUploadImages: 2,
    numberOfUploadFiles: 2,
    data: 'string',
    parentId: 0,
  },
  {
    id: '2',
    name: 'users',
    displayName: 'Users',
    singular: 'user',
    plural: 'users',
    numberOfUploadImages: 2,
    numberOfUploadFiles: 2,
    data: 'string',
    parentId: 0,
  },
];
