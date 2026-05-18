export interface SensorPayload {
    orientation: {
        x: number; 
        y: number;
    };
    aceleration: {
        x: number;
        y: number;
        z: number;
    };
}