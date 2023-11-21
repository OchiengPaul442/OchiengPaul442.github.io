import React, { useState, useRef, Children, cloneElement } from 'react'
import {
    ArrowBackIos as BackIcon,
    ArrowForwardIos as ForwardIcon,
} from '@mui/icons-material'
import { orange } from '@mui/material/colors'

const Carousel = ({ children }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const touchStartPos = useRef(0)
    const childrenArray = Children.toArray(children)

    const handleTouchStart = (e) => {
        touchStartPos.current = e.touches[0].clientX
    }

    const handleTouchMove = (e) => {
        const touchEndPos = e.touches[0].clientX
        const diff = touchStartPos.current - touchEndPos

        if (diff > 70 && currentIndex < childrenArray.length - 1) {
            // swipe left
            setCurrentIndex((prevIndex) => prevIndex + 1)
        } else if (diff < -70 && currentIndex > 0) {
            // swipe right
            setCurrentIndex((prevIndex) => prevIndex - 1)
        }
    }

    const handleBackClick = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1)
        }
    }

    const handleForwardClick = () => {
        if (currentIndex < childrenArray.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1)
        }
    }

    return (
        <div
            className="relative flex items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
        >
            {cloneElement(childrenArray[currentIndex], { key: currentIndex })}
            {isHovered && childrenArray.length > 1 && (
                <div>
                    <button
                        onClick={handleBackClick}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow-md flex items-center justify-center"
                    >
                        <BackIcon
                            style={{
                                color: orange[500],
                                left: '4px',
                                position: 'relative',
                            }}
                        />
                    </button>
                    <button
                        onClick={handleForwardClick}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow-md flex items-center justify-center"
                    >
                        <ForwardIcon style={{ color: orange[500] }} />
                    </button>
                </div>
            )}
        </div>
    )
}

export default Carousel
