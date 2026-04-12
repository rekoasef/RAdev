export interface DbProject {
  id: number;
  title: string;
  type: string;
  icon_name: string;
  objective: string;
  my_role: string | null;
  tech_stack: string[];
  live_url: string | null;
  code_url: string | null;
  featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export type ProjectInput = Omit<DbProject, 'id' | 'created_at' | 'updated_at'>;
