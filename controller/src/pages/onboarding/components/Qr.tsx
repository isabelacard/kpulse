import qrmobile from "../../../assets/qrmobile.png"

export default function Qr() {
    return (
        <div className="relative w-70 h-70 sm:w-[320px] sm:h-80 p-1.5 bg-[#FBB03B] rounded-2xl shadow-lg">
            {/* 2. Contenedor de la foto de fondo */}
            <div className="relative w-full h-full bg-gray-200 rounded-xl overflow-hidden flex items-center justify-center">
                <img src={qrmobile} alt="Fondo clínica" className="absolute inset-0 w-full h-full object-cover" />

            </div>
        </div>
    );
}
