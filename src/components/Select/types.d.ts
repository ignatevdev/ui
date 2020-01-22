export type SingleValue = string | number;
export type MultipleValue = SingleValue[];

export type Value = SingleValue | MultipleValue;

export interface Option {
  value: SingleValue;
  title: any;
  disabled?: boolean;
}

export type onChangeCallback = (
  value: Value,
  option: Option | Option[]
) => void;
