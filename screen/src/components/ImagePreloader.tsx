import { useEffect } from "react";

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

function preloadImage(src: string) {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    link.fetchPriority = "high";
    document.head.appendChild(link);
}

IMAGES_TO_PRELOAD.forEach(preloadImage);

export default function ImagePreloader() {
    useEffect(() => {
        IMAGES_TO_PRELOAD.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    return null;
}
