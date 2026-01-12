export type InputLookupProps = {
  onChange?: (value: any) => void;
  remote: string;
  action: string;
  idField?: string;
  codeField?: string;
  descriptionField?: string;
  label?: string;
  lookupTemplate?: any;
  treeLookupTemplate?: any;
};

export type LookupOption = Record<string, any>;
