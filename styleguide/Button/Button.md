Button component

```jsx padded
<Button>
    Content
</Button>

<Button loading>
    Content
</Button>

<Button
    renderPrefix={() => 'Prefix '}
    renderSuffix={() => ' Suffix'}
>
    Content
</Button>
```

Live example
```jsx

const [loading, setLoading] = React.useState(false);

<Button loading={loading} onClick={(e) => {
    e.preventDefault();

    setLoading(!loading);
}}>
    Toggle
</Button>
```