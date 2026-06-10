import { useEffect } from "react";

// Import all background and large assets to get their resolved URLs in production
import fondo from "../assets/fondo.webp";
import fondocarga from "../assets/fondocarga.webp";
import fondocarga2 from "../assets/fondocarga2.webp";
import fondocarga3 from "../assets/fondocarga3.webp";
import Instrucciones1 from "../assets/Instrucciones1.webp";
import pelota1 from "../assets/pelota1.webp";
import celular1 from "../assets/celular1.webp";
import pelota2 from "../assets/pelota2.webp";
import instrucciones2 from "../assets/instrucciones2.webp";
import esfera1 from "../assets/esfera1.webp";
import Abuela1 from "../assets/Abuela1.webp";
import calibration1 from "../assets/calibration1.webp";
import fondote from "../assets/fondote.webp";
import fondotefinal from "../assets/fondotefinal.webp";
import allsetfondo from "../assets/allsetfondo.webp";
import graciasfondo from "../assets/graciasfondo.webp";

const IMAGES_TO_PRELOAD = [fondo, fondocarga, fondocarga2, fondocarga3, Instrucciones1, pelota1, celular1, pelota2, instrucciones2, esfera1, Abuela1, calibration1, fondote, fondotefinal, allsetfondo, graciasfondo];

export default function ImagePreloader() {
    useEffect(() => {
        // Wait a tiny bit (100ms) for the initial render of the current screen to finish
        const timer = setTimeout(() => {
            console.log("Starting background preloading of screen images...");
            IMAGES_TO_PRELOAD.forEach((src) => {
                const img = new Image();
                img.src = src;
            });
            console.log("Background preloading of screen images initialized.");
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return null; // Renderless component
}
