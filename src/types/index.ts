export type FieldType =
  | 'number'
  | 'string'
  | 'text'
  | 'date'
  | 'select'
  | 'checkbox'
  | 'radio';

export interface SelectOption {
  label: string;
  value: string;
}

export interface ProfileFieldDefinition {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: SelectOption[];
  helperText?: string;
  min?: number;
  max?: number;
  required?: boolean;
  defaultValue?: string | number | string[];
}

export interface ProfileFormData {
  [key: string]: string | number | string[] | undefined;
}

export interface FlashCard {
  id: string;
  word: string;
  translation: string;
  transcription: string;
  partOfSpeech: string;
  exampleSentence: string;
  exampleTranslation: string;
  topic: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
}

export interface UserProfileSummary {
  username: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  role: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfileSummary | null;
  error: string | null;
  isLoading: boolean;
}

export interface HeaderProps {
  appName: string;
  user: UserProfileSummary | null;
  isAuthenticated: boolean;
  onLogout: () => void;
}

export interface FooterProps {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  copyright: string;
  links: Array<{ title: string; href: string }>;
}

export interface PageProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export interface BodyProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export interface CardProps {
  card: FlashCard;
  quoteTitle: string;
  isFlipped: boolean;
  onToggleFlip: (id: string) => void;
}

export interface CardListProps {
  cards: FlashCard[];
  flippedCardIds: Record<string, boolean>;
  onToggleFlip: (id: string) => void;
  randomQuote: string;
}

export interface FieldProps {
  definition: ProfileFieldDefinition;
  value: string | number | string[] | undefined;
  onChange: (fieldId: string, value: string | number | string[]) => void;
  disabled?: boolean;
  hidden?: boolean;
  error?: string;
}

export interface EditViewProps {
  fields: ProfileFieldDefinition[];
  values: ProfileFormData;
  onChange: (fieldId: string, value: string | number | string[]) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
  disabledFieldIds?: Record<string, boolean>;
  hiddenFieldIds?: Record<string, boolean>;
  isSubmitting?: boolean;
  saveSuccess?: boolean;
}
