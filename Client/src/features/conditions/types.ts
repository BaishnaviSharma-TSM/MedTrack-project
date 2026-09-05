export type ConditionFieldDef = {
  key: string;
  label: string;
  type: 'number' | 'text' | 'boolean';
  unit?: string;
  placeholder?: string;
  required?: boolean;
};

export type ConditionDefinition = {
  slug: string;
  label: string;
  fields: ConditionFieldDef[];
};
