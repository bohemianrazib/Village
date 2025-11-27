export type Language = 'bn' | 'en';

export interface LocalizedString {
  bn: string;
  en: string;
}

export interface Product {
  id: number;
  name: LocalizedString;
  price: number;
  image: string;
  description: LocalizedString;
  type: 'tshirt' | 'mug' | 'poster' | 'tote';
}

export interface CartItem {
  id: number;
  name: string; // Snapshotted localized name
  price: number;
  image: string;
  customText?: string;
  quantity: number;
}

export enum SloganTone {
  EMOTIONAL = 'emotional',
  FUNNY = 'funny',
  POETIC = 'poetic',
  SHORT = 'short'
}