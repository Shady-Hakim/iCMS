import type { UseFormSetValue } from 'react-hook-form';

export interface ContentField {
  id?: string;
  name: string;
  type: string;
  defaultValue: string;
  isRequired: boolean;
  isPrivate: boolean;
  minLength: number;
  maxLength: number;
}

export interface ContentFieldDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ContentField) => void;
  initialData?: ContentField | null;
}

export interface ContentFieldFormProps {
  control: any;
  setValue: UseFormSetValue<ContentField>;
  setIsLastStep?: (isLastStep: boolean) => void;
}

export type ContentFieldTableRowProps = {
  row: ContentField;
  selected: boolean;
  onSelectRow: () => void;
};
