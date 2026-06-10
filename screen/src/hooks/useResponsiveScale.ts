import { useState, useEffect } from "react";

export function useResponsiveScale(targetWidth = 1176, targetHeight = 648) {
    const [scale, setScale] = useState(() => {
        const scaleX = window.innerWidth / targetWidth;
        const scaleY = window.innerHeight / targetHeight;

        return Math.min(scaleX, scaleY);
    });

    useEffect(() => {
        const updateScale = () => {
            const scaleX = window.innerWidth / targetWidth;
            const scaleY = window.innerHeight / targetHeight;

            setScale(Math.min(scaleX, scaleY));
        };

        window.addEventListener("resize", updateScale);

        return () => {
            window.removeEventListener("resize", updateScale);
        };
    }, [targetWidth, targetHeight]);

    return scale;
}
