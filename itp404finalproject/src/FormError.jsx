export default function FormError(props) {
    return (
        <>
            <div className="pb-3">
                <small className="text-danger">{props.message}</small>
            </div>
        </>
    );
}