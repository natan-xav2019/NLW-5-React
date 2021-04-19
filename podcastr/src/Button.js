import { useState } from 'react';

export default function Button(props) {
    const [counter, setCounter] = useState(1);

    function inclement() {
        setCounter(counter + 1 );
    }

    return (
        <>
        <span>{counter}</span>
        <button onClick={inclement}>{props.children}</button>
        <br />
        </>
    );
}