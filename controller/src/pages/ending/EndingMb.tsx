import fondoending from "../../assets/fondoending1.png"

export default function EndindMb() {
    return (
        <div className="relative w-full h-screen flex flex-col items-center bg-center bg-cover bg-no-repeat overflow-hidden" style={{ backgroundImage: `url(${fondoending})` }}>
            <div className="flex flex-col items-center justify-center w-full h-full max-w-97.5 pt-[20%] pb-[15%] px-6">
                
                {/* Contenedor del título centrado */}
                <div className="text-center my-auto flex flex-col items-center">
                    <h1 className="text-white text-4xl font-poppins font-medium tracking-wide">
                        Bye bye
                    </h1>
                    <h2 className="bg-linear-to-b from-white to-yellow-500 bg-clip-text text-transparent text-4xl font-poppins font-medium mt-2">
                        Take care!
                    </h2>
                </div>

            </div>
        </div>
    );
}