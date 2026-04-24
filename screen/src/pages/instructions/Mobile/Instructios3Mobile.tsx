import ImagenFondoCelular from "../../../assets/fondocelularinstructions.png";

function Instructions3Mobile() {
    return (
        <div className="flex items-center justify-center w-full h-screen p-4 overflow-hidden">
            <div className="relative flex items-center justify-center">
                <img className="max-w-full max-h-full object-contain" src={ImagenFondoCelular} />
                <div className="absolute z-10 flex flex-col items-center h-full top-80">
                    <div className="flex flex-col mt-10">
                        <h1 className="text-white text-4xl text-center">Stand Up</h1>
                        <h1 className="text-white text-4xl text-center">
                            <span className="text-[#F6CF84] font-bold">Straight</span>
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Instructions3Mobile;
