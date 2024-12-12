import { useState } from "react";

export default function Destination(props) {
    const [expanded, setExpanded] = useState(props.isExpanded);

    return (
        <div className="container my-4">
            <div className="card">
                <div className="card-header d-flex">
                    <h2>Destination #{props.destinationId}</h2>
                    <button onClick={() => {
                        setExpanded(!expanded);
                    }}
                    style={{ margin: "10px" }}
                    >
                        {props.renderTriggerIcon(expanded)}
                    </button>
                </div>
                {expanded && 
                    <div className="card-body">
                        <div><p>{props.user} wants to visit {props.attraction} in {props.name}.</p></div>
                    </div>
                }
            </div>
            
        </div>
    );
}