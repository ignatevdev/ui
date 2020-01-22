Select component

Live example

```jsx
const [value, setValue] = React.useState(null);

const options = [
  {
    title: 'Option zero',
    value: 0,
    disabled: true,
  },
  {
    title: 'Option one',
    value: 1
  },
  {
    title: 'Option two',
    value: 2,
    disabled: true
  },
  {
    title: 'Option three',
    value: 3
  },
  {
    title: 'Option four',
    value: 4,
    disabled: true
  }
];

<Select
  value={value}
  onChange={(value) => {
    setValue(value);
  }}
  options={options}
  placeholder="Select a value"
/>;
```


```jsx
const [value, setValue] = React.useState(null);

const options = [
  {
    title: 'Option zero',
    value: 0,
    disabled: true,
  },
  {
    title: 'Option one',
    value: 1
  },
  {
    title: 'Option two',
    value: 2,
    disabled: true
  },
  {
    title: 'Option three',
    value: 3
  },
  {
    title: 'Option four',
    value: 4,
    disabled: true
  }
];

<Select
  value={value}
  multiple
  onChange={(value) => {
    setValue(value);
  }}
  options={options}
  placeholder="Select multiple values"
/>;
```
