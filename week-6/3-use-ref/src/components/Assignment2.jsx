import React, { useState, useCallback } from 'react';
import { useRef } from 'react';

// Create a component that tracks and displays the number of times it has been rendered. Use useRef to create a variable that persists across renders without causing additional renders when it changes.

export function Assignment2() {
    const [, forceRender] = useState(0);
    const noOfRendered = useRef(1);

    const handleReRender = () => {
        // Update state to force re-render
        noOfRendered.current = noOfRendered.current +1 ;
        forceRender(Math.random());
    };

    return (
       
        <div>
         
            <p>This component has rendered {noOfRendered.current} times.</p>
            <button onClick={handleReRender}>Force Re-render</button>
        </div>
    );
};