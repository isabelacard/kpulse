import type React from "react";

interface QrCodeProps {
    icon: React.ReactNode;
    description: string;
}

export const Qrcode = ({ icon, description }: QrCodeProps) => {
    return (
        <div className="bg-[#0b6e6d] p-3 rounded-xl flex flex-col items-center w-80 shadow-lg">
            <div className="bg-[#f2efe6] w-full aspect-square rounded-lg flex items-center justify-center mb-3 p-3">{icon}</div>

            <p className="text-white text-center font-medium text-s leading-tight px-1">{description}</p>
        </div>
    );
};
