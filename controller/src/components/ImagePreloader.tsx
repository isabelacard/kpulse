import { useEffect } from "react";

import allsetmb from "../assets/allsetmb.webp";
import asanlogo from "../assets/asanlogo.webp";
import fondocelularinstructions from "../assets/fondocelularinstructions.webp";
import fondoending1 from "../assets/fondoending1.webp";
import fondomobile1 from "../assets/fondomobile1.webp";
import fondoteform from "../assets/fondoteform.webp";
import fondotegametwo from "../assets/fondotegametwo.webp";

const IMAGES_TO_PRELOAD = [allsetmb, asanlogo, fondocelularinstructions, fondoending1, fondomobile1, fondoteform, fondotegametwo];

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
