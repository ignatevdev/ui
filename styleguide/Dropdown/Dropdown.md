Dropdown component


Live example
```jsx
import Button from '../Button/Button';

const [opened, setOpened] = React.useState(false);

const Counter = () => {
    const [timer, setTimer] = React.useState(0);

    React.useEffect(
        () => {
            let counter = timer;

            const interval = setInterval(
                () => {
                    counter += 1;

                    setTimer(counter);
                },
                1000
            );

            return () => {
                clearInterval(interval);
            };
        },
        []
    )

    return timer;
}

const renderContent = () => <div>Timer is <Counter /></div>;

<Dropdown renderContent={renderContent} opened={opened}>
    <Button onClick={() => setOpened(!opened)}>
        Toggle dropdown
    </Button>
</Dropdown>
```