export default function Input(props){
    return (
        <>
            <div className="my-3">
                <label className="form-label" htmlFor={props.id}>
                    {props.label}
                </label>
                <input
                    className="form-control"
                    type="text"
                    id={props.id}
                    value={props.value}
                    onChange={(event) => {
                        props.onChange(event.target.value);
                    }}
                    
                />
            </div>
        </>
    );
}