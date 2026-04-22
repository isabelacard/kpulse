import ImagenFondo from "../../../assets/Instrucciones1.png";
import Pelota1 from "../../../assets/pelota1.png";
import Celular1 from "../../../assets/celular1.png";

function Instructions1() {
    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div className="relative w-294 h-162 shrink-0 overflow-hidden rounded-xl">
                <img className="absolute z-10 w-200 right-150 top-20" src={Pelota1}></img>
                <img className="absolute z-10 w-120 left-195 top-40" src={Celular1}></img>
                <img className="absolute" src={ImagenFondo} />
                <div className="relative z-10 flex flex-col items-center mt-20 h-full">
                    <div className="flex items-center gap-4 mb-8">
                        <div
                            className="w-20 h-20 rounded-full bg-[#A9A9A9] flex items-center 
                        justify-center text-white font-bold"
                        >
                            <p className="text-4xl text-white/70">1</p>
                        </div>
                        <div className="w-15 h-1 bg-white/53 rounded" />
                        <div
                            className="w-20 h-20 rounded-full bg-[#A9A9A9] flex items-center 
                        justify-center text-white font-bold"
                        >
                            <p className="text-4xl text-white/70">2</p>
                        </div>
                        <div className="w-15 h-1 bg-white/53 rounded" />
                        <div
                            className="w-20 h-20 rounded-full bg-[#A9A9A9] flex items-center 
                        justify-center text-white font-bold"
                        >
                            <p className="text-4xl text-white/70">3</p>
                        </div>
                    </div>

                    <div className="flex flex-col mt-22">
                        <h1 className="text-white text-4xl text-center">
                            Follow the <span className="text-[#F6CF84] font-bold">Instructions</span>, to
                        </h1>
                        <h1 className="text-white text-4xl text-center">
                            use the <span className="text-[#F6CF84] font-bold">sphere</span>
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Instructions1;
