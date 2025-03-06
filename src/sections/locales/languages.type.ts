import type { UseFormSetValue } from 'react-hook-form';

export interface LocaleFormData {
  code: string;
  name: string;
  nativeName?: string;
  isActive?: boolean;
}

export interface Language extends LocaleFormData {
  id: string;
  flag?: string;
  isDefault?: boolean;
}

export interface LocaleDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Language) => void;
  initialData?: LocaleFormData | null;
}

export interface LocaleFormProps {
  control: any;
  languages: Language[];
  setValue: UseFormSetValue<Language>;
}

export type LanguageTableRowProps = {
  row: Language;
  selected: boolean;
  onSelectRow: () => void;
};
