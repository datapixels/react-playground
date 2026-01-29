import React from "react";

export function TestComponent() {
    const [count, setCount] = React.useState(0);
    return (
        <button onClick={()=> setCount(count+1)}>
        My Counter {count}
        </button>
    )
}