import { useEffect, useRef } from "react";

// Create a component with a text input field and a button. When the component mounts or `the` button is clicked, automatically focus the text input field using useRef.

export function Assignment1() {

    const inputField = useRef();

    useEffect(() => {
        inputField.current.focus();

    }, []);

    const handleButtonClick = () => {
        inputField.current.focus();

    };

    return (
        <div>
            <input ref={inputField}  type="text" placeholder="Enter text here" />
            <button onClick={handleButtonClick}>Focus Input</button>
        </div>
    );
};
