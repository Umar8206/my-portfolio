import React from 'react'

const WindowScreen = ({ children, containerClassName }) => {
    return (
        <div className={`ai-window-screen ${containerClassName}`}>
           
            <div>
                {children}
            </div>
        </div>
    )
}

WindowScreen.propTypes = {}

export default WindowScreen