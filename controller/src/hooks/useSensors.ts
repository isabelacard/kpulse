import { useCallback, useEffect, useRef, useState } from "react";
import type { SensorPayload } from "../types/sensor.types";

export const useSensors = () => {
    const [sensorData, setSensorData] = useState<SensorPayload>({
        orientation: { x: 0, y: 0 },
        acceleration: { x: 0, y: 0, z: 0 },
    });

    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    //keep track of recent readings and smooth out the movement
    const betaHistory = useRef<number[]>([]);
    const gammaHistory = useRef<number[]>([]);
    const MAX_SAMPLES = 5;

    const requestAccess = useCallback(async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
            try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const response = await (DeviceOrientationEvent as any).requestPermission();
                setHasPermission(response === "granted");
            } catch (error) {
                console.error("Permission error:", error);
                setHasPermission(false);
            }
        } else {
            setHasPermission(true);
        }
    }, []);

    useEffect(() => {
        if (!hasPermission) return;

        const handleOrientation = (e: DeviceOrientationEvent) => {
            let currentBeta = e.beta || 0;
            let currentGamma = e.gamma || 0;

            currentBeta = Math.max(-45, Math.min(45, currentBeta));
            currentGamma = Math.max(-45, Math.min(45, currentGamma));

            betaHistory.current.push(currentBeta);
            gammaHistory.current.push(currentGamma);

            if (betaHistory.current.length > MAX_SAMPLES) betaHistory.current.shift();
            if (gammaHistory.current.length > MAX_SAMPLES) gammaHistory.current.shift();

            const smoothBeta = betaHistory.current.reduce((a, b) => a + b, 0) / betaHistory.current.length;
            const smoothGamma = gammaHistory.current.reduce((a, b) => a + b, 0) / gammaHistory.current.length;

            setSensorData((prev) => ({
                ...prev,
                orientation: { x: smoothGamma, y: smoothBeta },
            }));
        };

        const handleMotion = (e: DeviceMotionEvent) => {
            setSensorData((prev) => ({
                ...prev,
                acceleration: {
                    x: e.acceleration?.x || 0,
                    y: e.acceleration?.y || 0,
                    z: e.acceleration?.z || 0,
                },
            }));
        };

        window.addEventListener("deviceorientation", handleOrientation);
        window.addEventListener("devicemotion", handleMotion);

        return () => {
            window.removeEventListener("deviceorientation", handleOrientation);
            window.removeEventListener("devicemotion", handleMotion);
        };
    }, [hasPermission]);

    return { sensorData, hasPermission, requestAccess };
};
