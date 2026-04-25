import type React from "react"

interface QrCodeProps {
    icon: React.ReactNode
    description: string;
}

export const Qrcode = ({ icon, description }: QrCodeProps) => {
    return (
        <div className="bg-[#0b6e6d] p-4 sm:p-5 rounded-2xl flex flex-col items-center w-100 font-sans shadow-lg">
            
            {/* Contenedor del QR (Fondo beige claro) */}
            <div className="bg-[#f2efe6] w-full aspect-square rounded-xl flex items-center justify-center mb-4 p-4">
                {/* Aquí se renderizará el icono o componente SVG que pases por props */}
                {icon}
            </div>
            
            {/* Texto descriptivo en la parte inferior */}
            <p className="text-white text-center font-medium text-sm sm:text-base px-2">
                {description}
            </p>
            
        </div>
    )
}