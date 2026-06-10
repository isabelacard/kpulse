import { useEffect } from "react";

// Import all background and large assets to get their resolved URLs in production
import allsetmb from "../assets/allsetmb.webp";
import asanlogo from "../assets/asanlogo.webp";
import fondocelularinstructions from "../assets/fondocelularinstructions.webp";
import fondoending1 from "../assets/fondoending1.webp";
import fondomobile1 from "../assets/fondomobile1.webp";
import fondoteform from "../assets/fondoteform.webp";
import fondotegametwo from "../assets/fondotegametwo.webp";

const IMAGES_TO_PRELOAD = [allsetmb, asanlogo, fondocelularinstructions, fondoending1, fondomobile1, fondoteform, fondotegametwo];

export default function ImagePreloader() {
    useEffect(() => {
        // Wait a tiny bit (100ms) for the initial render of the current screen to finish
        const timer = setTimeout(() => {
            console.log("Starting background preloading of controller images...");
            IMAGES_TO_PRELOAD.forEach((src) => {
                const img = new Image();
                img.src = src;
            });
            console.log("Background preloading of controller images initialized.");
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return null; // Renderless component
}
