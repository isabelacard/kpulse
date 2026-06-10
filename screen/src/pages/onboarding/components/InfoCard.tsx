import React from "react";

interface InfoCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export const InfoCard = ({ icon, title, description }: InfoCardProps) => {
    return (
        <div className="flex items-stretch overflow-hidden rounded-xl h-20 mb-3 bg-[#66a5ad]/40 backdrop-blur-sm border border-white/10 w-85">
            <div className="flex items-center justify-center w-16 bg-[#f38d16] text-white shrink-0">{icon}</div>

            <div className="flex flex-col justify-center px-4 py-2 text-white">
                <h3 className="font-medium text-[15px] leading-tight font-poppins">{title}</h3>

                <p className="text-white/80 text-[9px] leading-snug mt-0.5 font-poppins font-light">{description}</p>
            </div>
        </div>
    );
};
