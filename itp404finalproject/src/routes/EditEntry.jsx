import { useLoaderData, useNavigate } from "react-router-dom";
import EntryForm from "../EntryForm";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function EditEntry() {
    useEffect(() => {
        document.title = "Edit Travel Diary Entry"
    }, [])
    const entry = useLoaderData();
    const navigate = useNavigate();
    return (
        <EntryForm 
            entry={entry} 
            onSubmit={(updatedEntry) => {
                fetch(`http://localhost:4000/entries/${entry.id}`, {
                    method: "PATCH",
                    body: JSON.stringify(updatedEntry),
                    headers: {
                        "Content-type": "application/json",
                },
            })
            .then(() => {
                navigate(`/entries/${entry.id}`);
                toast.success('Your entry has been updated.')
            })
        }}
        />
    );
}
