import fondoform from "../../assets/fondotefinal.png";

export default function Formsfinal() {
    return (
        <div className="flex items-center justify-center w-full h-screen">
            <img src={fondoform} alt="Group 12" className="w-full h-screen object-contain z-0 absolute" />

            <div className="z-1 gap-0 md:gap-0 flex w-full flex-col items-center px-6 md:px-20 lg:px-42">
                {/* Barra de progreso */}
                <div className="absolute top-16 md:top-25 left-1/2 -translate-x-1/2 w-1/2 md:w-1/3 h-2 md:h-2.5 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full w-120 bg-yellow-200 rounded-full" />
                </div>

                {/* Frase */}
                <h1 className="text-white text-2xl md:text-4xl mt-16 md:mt-20 w-full md:w-200 font-medium text-center mb-20 md:mb-15 max-w-lg leading-tight">
                    You successfully completed your <span className="text-[#F7C668]">diagnostic form!</span>
                </h1>
                <h2 className="text-white text-1xl md:text-2xl mt-1 md:mt-2 w-full md:w-200 font-medium text-center mb-2 md:mb-3 max-w-lg leading-tight">Let’s start instructions.</h2>
                <div className="w-55 h-1 bg-yellow-200 rounded-full mt-0" />
            </div>
        </div>
    );
}
