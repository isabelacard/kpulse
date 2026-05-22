export interface SensorPayload {
    orientation: {
        x: number;
        y: number;
    };
    acceleration: {
        x: number;
        y: number;
        z: number;
    };
}
