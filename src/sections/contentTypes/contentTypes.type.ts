import type { UseFormSetValue } from 'react-hook-form';

export interface ContentType {
  id?: string;
  name: string;
  displayName: string;
  singular: string;
  plural: string;
  numberOfUploadImages: number;
  numberOfUploadFiles: number;
  data: string;
  parentId: number;
}

export interface ContentTypeDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ContentType) => void;
  initialData?: ContentType | null;
}

export interface ContentTypeFormProps {
  control: any;
  contentTypes: ContentType[];
  setValue: UseFormSetValue<ContentType>;
}

export type ContentTypeTableRowProps = {
  row: ContentType;
  selected: boolean;
  onSelectRow: () => void;
};
