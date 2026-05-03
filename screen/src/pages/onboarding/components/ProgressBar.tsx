export const ProgressBar = ({ progress }: { progress: number }) => {
    return (
        <div className="w-full max-w-70 md:max-w-85 h-12 border-2 border-white rounded-full p-1 relative flex items-center">
            <div className="relative w-full h-full flex items-center">
                <div
                    className="absolute left-0 h-full bg-orange-400 rounded-full transition-all duration-1000 ease-out"
                    style={{
                        width: `calc(${progress}% - ${(progress / 100) * 40}px + 40px)`,
                    }}
                />

                <div
                    className="absolute h-full w-10 bg-white rounded-full shadow-md transition-all duration-1000 ease-out z-10"
                    style={{
                        left: `calc(${progress}% - ${(progress / 100) * 40}px)`,
                    }}
                />
            </div>
        </div>
    );
};
