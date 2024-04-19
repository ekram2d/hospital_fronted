/* eslint-disable react/prop-types */
import { useState } from "react";

const style = {
    button: {
        width: '10%',
        height: 50,
        fontWeight: 'bold',
        fontSize: 18,
        backgroundColor: '#34b7f1',
        borderWidth: 0,
        color: '#fff'
    },
    textarea: {
        width: '60%',
        height: 50,
        borderRadius: 10,
        borderWidth: 0,
        padding: 10,
        fontSize: 18
    },
    textContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }
};

export default function InputText({ onAddMessage }) {
    const [message, setMessage] = useState("");

    function handleAddMessage() {
        onAddMessage({
            message
        });
        setMessage("");
    }

    return (
        <div style={style.textContainer}>
            <textarea
                style={style.textarea}
                rows={6}
                placeholder="Write something ..."
                value={message}
                onChange={e => setMessage(e.target.value)}
            />
            <button
                onClick={handleAddMessage}
                style={style.button}
            >
                Enter
            </button>
        </div>
    );
}
