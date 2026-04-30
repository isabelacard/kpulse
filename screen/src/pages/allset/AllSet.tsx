import allsetfondo from "../../assets/allsetfondo.png"

export default function AllSet() {
    return (
        <div className="flex items-center justify-center w-full h-screen relative bg-black/5 overflow-hidden">
            <img src={allsetfondo} alt="correo" className="w-full h-screen object-contain z-0 absolute" />

            <div className="z-10 flex w-full flex-col items-center justify-center px-6 md:px-20 lg:px-42">
                
                <div className="w-full max-w-2xl flex justify-center">
                    
                    <header className="mb-6 md:mb-10 text-center font-poppins font-medium text-white text-2xl">
                        <p className="bg-linear-to-b from-white to-yellow-400 bg-clip-text text-transparent">You're all set!</p>
                        <p>enter your email to</p>
                        <p>recieve your results.</p>
                    </header>
                    
                </div>
            </div>
        </div>
    );
}
