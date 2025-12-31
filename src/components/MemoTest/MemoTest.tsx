import * as React from "react";

export function MemoTest() {
    const [count, setCount] = React.useState(0);

    return (
        <div>
            <h2>Memo Test Component</h2>
            <button onClick={() => setCount(count + 1)}>Increment Count ({count})</button>
            <MemoCounter count={count}></MemoCounter>
        </div>
    );


}

export function MemoCounter({count = 0}: {count: number}) {
    const [multiplier, setMultiplier] = React.useState(1);
    const values = React.useMemo(() => getValues(), []);

    const multiplyValues = React.useCallback(() => {
        return values.map(v => v * multiplier);
    }, [values]);

    return <div>
        {values.join(", ")}
         Counter {count}
        <div>
            <label>Multiplier: </label>
            <input type="number" value={multiplier} onChange={e => setMultiplier(Number(e.target.value))} />    
        </div>
        <div>
            Multiplied Values: {multiplyValues().join(", ")}
        </div>
    </div>;
}

function getValues() {
    console.log("getValues called");
    return [1, 2, 3, 4, 5];
}