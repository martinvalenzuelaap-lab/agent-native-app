export type Category =
  | "deportes"
  | "economia"
  | "geopolitica"
  | "tecnologia"
  | "cultura"
  | "salud";

export interface NewsItem {
  id: string;
  date: string;
  country: string;
  outlet: string;
  category: Category;
  title: string;
  imageUrl: string;
  link: string;
  savedManually?: boolean;
}
