import ImagenFondo from "../../../assets/Instrucciones1.png";
import Check1 from "../../../assets/check1.png";
import LoadingBar from "../../../components/LoadingBar";

function Instructions4() {
    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div className="relative w-294 h-162 shrink-0 overflow-hidden rounded-xl">
                <img className="absolute" src={ImagenFondo} />
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
                            <p className="text-4xl text-white text-shadow-lg">3</p>
                        </div>
                    </div>

                    <div className="flex flex-col mt-22 absolute top-20">
                        <h1 className="text-white text-4xl text-center">
                            Before we <span className="text-[#F6CF84] font-bold">Begin, </span>let's
                        </h1>
                        <h1 className="text-white text-4xl text-center">
                            calibrate the <span className="text-[#F6CF84] font-bold">sphere</span>
                        </h1>
                    </div>

                    {/* <div className="border-2 border-[#FFB349] w-100 h-9.5 rounded-4xl absolute mt-18 top-48">
                        <div className="bg-[#F6CF84] w-7.5 h-7.5 rounded-4xl mt-0.5 ml-0.5"></div>
                        <p className="text-[#F6CF84]/70 text-[15px] mt-1.5 flex justify-center">Wait a few seconds</p>
                    </div> */}

                    <LoadingBar></LoadingBar>
                </div>
            </div>
        </div>
    );
}

export default Instructions4;
