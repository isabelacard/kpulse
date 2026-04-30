import graciasfondo from "../../assets/graciasfondo.png";

export default function Ending() {
    return (
        <div className="flex items-center justify-center w-full h-screen relative bg-black/5 overflow-hidden">
            <img src={graciasfondo} alt="Fondo final" className="w-full h-screen object-contain z-0 absolute" />

            <div className="z-10 flex w-full flex-col lg:flex-row items-center justify-between px-6 md:px-20 lg:px-42">
                <div className="w-full max-w-2xl lg:translate-x-9">
                    <header className="mb-6 md:mb-10 text-left">
                        <h1 className="text-white text-[60px] md:text-[80px] font-bold leading-[1.05] tracking-tight">
                            <span className="relative inline-block font-poppins font-medium mt-2 md:mt-5">Thanks for</span>
                            <br />
                            <span className="inline-flex items-center">
                                <span className="bg-linear-to-b from-white to-cyan-300 bg-clip-text text-transparent font-poppins font-medium pb-4">Playing</span>
                            </span>
                        </h1>
                    </header>
                </div>
            </div>
        </div>
    );
}