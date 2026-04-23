import ImagenFondo2 from "../../../assets/instrucciones2.png";
import Esfera1 from "../../../assets/esfera1.png";
import Check1 from "../../../assets/check1.png";
import Abuela1 from "../../../assets/Abuela1.png";

function Instructions3() {
    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div className="relative w-294 h-162 shrink-0 overflow-hidden rounded-xl">
                <img className="absolute z-10 w-150 left-3 top-60" src={Esfera1}></img>
                <img className="absolute z-10 w-105 left-30 top-15" src={Abuela1}></img>
                <img className="absolute" src={ImagenFondo2} />
                <div className="relative z-10 flex flex-col items-center mt-20 h-full">
                    <div className="flex items-center gap-4 mb-8">
                        <div
                            className="w-20 h-20 rounded-full bg-white flex items-center 
                        justify-center text-white font-bold"
                        >
                            <img className="absolute w-15" src={Check1}></img>
                        </div>
                        <div className="w-15 h-1 bg-white/53 rounded" />
                        <div
                            className="w-20 h-20 rounded-full bg-[#00FFD5] flex items-center 
                        justify-center text-white font-bold"
                        >
                            <p className="text-4xl text-white text-shadow-lg">2</p>
                        </div>
                        <div className="w-15 h-1 bg-white/53 rounded" />
                        <div
                            className="w-20 h-20 rounded-full bg-[#A9A9A9] flex items-center 
                        justify-center text-white font-bold"
                        >
                            <p className="text-4xl text-white/70 text-shadow-lg">3</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-end mt-22 absolute left-155 top-35">
                        <h1 className="text-white text-4xl text-center">
                            Keep a <span className="text-[#F6CF84] font-bold">comfortable posture</span>
                        </h1>
                        <h1 className="text-white text-4xl text-center">to start playing.</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Instructions3;
