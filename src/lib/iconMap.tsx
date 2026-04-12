import React from 'react';
import {
  Scale, Coffee, Apple, Camera, Code, Globe, Smartphone,
  ShoppingCart, BarChart3, Database, Home, GraduationCap,
  Heart, Briefcase, Utensils, Wrench, Palette, Star,
} from 'lucide-react';

export const ICON_OPTIONS = [
  'Scale', 'Coffee', 'Apple', 'Camera', 'Code', 'Globe',
  'Smartphone', 'ShoppingCart', 'BarChart3', 'Database',
  'Home', 'GraduationCap', 'Heart', 'Briefcase', 'Utensils',
  'Wrench', 'Palette', 'Star',
] as const;

export type IconName = typeof ICON_OPTIONS[number];

const iconComponents: Record<string, React.ReactNode> = {
  Scale: <Scale className="w-12 h-12" />,
  Coffee: <Coffee className="w-12 h-12" />,
  Apple: <Apple className="w-12 h-12" />,
  Camera: <Camera className="w-12 h-12" />,
  Code: <Code className="w-12 h-12" />,
  Globe: <Globe className="w-12 h-12" />,
  Smartphone: <Smartphone className="w-12 h-12" />,
  ShoppingCart: <ShoppingCart className="w-12 h-12" />,
  BarChart3: <BarChart3 className="w-12 h-12" />,
  Database: <Database className="w-12 h-12" />,
  Home: <Home className="w-12 h-12" />,
  GraduationCap: <GraduationCap className="w-12 h-12" />,
  Heart: <Heart className="w-12 h-12" />,
  Briefcase: <Briefcase className="w-12 h-12" />,
  Utensils: <Utensils className="w-12 h-12" />,
  Wrench: <Wrench className="w-12 h-12" />,
  Palette: <Palette className="w-12 h-12" />,
  Star: <Star className="w-12 h-12" />,
};

export function getIcon(name: string): React.ReactNode {
  return iconComponents[name] ?? iconComponents['Code'];
}
