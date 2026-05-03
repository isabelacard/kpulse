function BreathingCircle() {
    return (
        <>
            <div className="w-15 h-15 bg-[#1FD0D3] rounded-4xl mt-60 flex items-center justify-center">
                <div className="animate-ripple absolute w-23 h-23 border-7 border-[#1FD0D3]/80 rounded-full" style={{ animationDelay: "0s" }}></div>
                <div className="animate-ripple absolute w-29 h-29 border-4 border-[#1FD0D3]/60 rounded-full" style={{ animationDelay: "0.4s" }}></div>
                <div className="animate-ripple absolute w-37 h-37 border-3 border-[#1FD0D3]/40 rounded-full" style={{ animationDelay: "0.8s" }}></div>
                <div className="animate-ripple absolute w-46 h-46 border-2 border-[#1FD0D3]/20 rounded-full" style={{ animationDelay: "1.2s" }}></div>
            </div>
        </>
    );
}

export default BreathingCircle;
