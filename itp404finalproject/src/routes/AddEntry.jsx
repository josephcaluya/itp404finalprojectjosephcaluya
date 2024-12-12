import EntryForm from "../EntryForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AddEntry() {
    useEffect(() => {
        document.title = "Add Travel Diary Entry";
    }, []);
    const navigate = useNavigate();
    return (
        <EntryForm onSubmit={(newEntry) => {
            fetch(`http://localhost:4000/entries`, {
            method: "POST",
            body: JSON.stringify(newEntry),
            headers: {
                "Content-type": "application/json",
            },
            }).then(() => {
                navigate("/entries");
                toast.success('Your entry has been submitted!')
            })
        }}
        />
    );
}