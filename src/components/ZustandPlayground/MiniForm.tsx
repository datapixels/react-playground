export function MiniForm({model}: {model: any}) {
    return (
        <div>
            <h3>Mini Form</h3>
            <p>{model?.primary}</p>
            <p>{model?.secondary}</p>
        </div>
    );
}