import React from "react";

interface InfoCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export const InfoCard = ({ icon, title, description }: InfoCardProps) => {
    return (
        <div className="flex items-stretch overflow-hidden rounded-2xl h-24 mb-4 bg-[#66a5ad]/40 backdrop-blur-sm border border-white/10 w-full max-w-md">
            {/*Lado naranja*/}
            <div className="flex items-center justify-center w-20 bg-[#f38d16] text-white text-3xl shrink-0">{icon}</div>
            {/*Lado de texto*/}
            <div className="flex flex-col justify-center px-6 py-2 text-white">
                <h3 className="font-medium text-[18px] leading-tight font-poppins">{title}</h3>
                <p className="text-white/80 text-[10.5px] leading-snug mt-1 font-poppins font-light">{description}</p>
            </div>
        </div>
    );
};
