import {Option, Value} from '../../types';

interface SelectedOptionHookArguments {
  multiple: boolean;

  options: Option[];

  value: Value;
}

interface ComputedValue {
  value: Value;
  option?: Option;
  options?: Option[];
}

const useSelectedOption = ({
  multiple,
  options,
  value
}: SelectedOptionHookArguments) => {
  const optionsByValue = options.reduce(
    (acc: any, opt: Option) => acc.set(opt.value, opt),
    new Map()
  );

  let selectedOption;
  let selectedOptions;

  if (multiple && Array.isArray(value)) {
    selectedOptions = value.map(val => optionsByValue.get(val));
  } else if (value) {
    selectedOption = options.find(option => option.value === value);
  }

  const computeNewValue = (appliedOption: Option): ComputedValue => {
    if (multiple) {
      if (Array.isArray(value) && value.includes(appliedOption.value)) {
        const newValue = value.filter(val => val !== appliedOption.value);
        const newOptions = newValue.map(val => optionsByValue.get(val));

        return {
          value: newValue,
          options: newOptions
        };
      }

      const currentOptions = Array.isArray(value)
        ? (value as Array<string | number>).map(
            (val): Option => optionsByValue.get(val)
          )
        : [];

      const newOptions = [...currentOptions, appliedOption];
      const newValue = newOptions.map(opt => opt.value);

      return {
        value: newValue,
        options: newOptions
      };
    }

    return {
      value: appliedOption.value,
      option: appliedOption
    };
  };

  return {
    computeNewValue,

    selectedOption,
    selectedOptions
  };
};

export default useSelectedOption;
