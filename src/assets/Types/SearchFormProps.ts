import { ChangeEvent, FormEvent } from 'react';

export interface SearchFormProps {
  searchTerm: string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: FormEvent) => void;
}