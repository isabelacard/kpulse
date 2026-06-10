import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import allsetmb from "../../assets/allsetmb.webp";
import { useSession } from "../../context/Sessioncontext";
import { api } from "../../services/api";
import { socket } from "../../socket";

export default function AllSet() {
    const [email, setEmailInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const sessionCtx = useSession()!;
    const { session } = sessionCtx;
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!email) return;
        setLoading(true);
        setError(null);

        try {
            if (session.survey.length > 0) {
                await api.submitSurvey(session.session_id, session.survey);
            }

            await api.linkPatient(session.session_id, email);

            // Generar y enviar reporte
            const reportRes = await api.sendReport(session.session_id, email);
            console.log("Report response:", reportRes);
            if (reportRes.simulated) {
                console.warn("⚠️ El correo se simuló porque SMTP_USER no está configurado en el servidor.");
            }
            if (reportRes.mailSent === false) {
                console.warn("⚠️ El correo no se pudo enviar por SMTP. Detalle:", reportRes.mailError);
            }

            await api.endSession(session.session_id);

            socket.emit("changePage", "/final");
            navigate("/ending");
        } catch (err) {
            console.error("Error detallado al enviar datos:", err);
            const msg = err instanceof Error ? err.message : String(err);
            setError(`Error: ${msg}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative w-full h-screen flex flex-col items-center bg-center bg-size-[100%_100%] bg-no-repeat overflow-hidden" style={{ backgroundImage: `url(${allsetmb})` }}>
            <div className="flex flex-col items-center justify-center w-full h-full max-w-sm px-6 py-12">
                <div className="flex flex-col items-center w-full gap-8">
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-white text-4xl tracking-wide font-poppins font-medium">Enter your</h1>
                        <h2 className="text-white text-4xl font-poppins font-medium mt-2">E-mail</h2>
                    </div>

                    <div className="flex flex-col items-center justify-center w-full max-w-xs gap-6 mt-8">
                        <div className="flex items-center w-full bg-[#E5E5E5] rounded-full px-6 py-3">
                            <Mail className="text-[#EA8D1C] w-5 h-5" strokeWidth={2.5} />
                            <input
                                type="email"
                                placeholder="E-mail"
                                value={email}
                                onChange={(e) => setEmailInput(e.target.value)}
                                className="bg-transparent border-none outline-none text-gray-700 ml-3 w-full placeholder-gray-400 font-poppins text-lg"
                            />
                        </div>

                        {error && <p className="text-red-300 text-sm font-poppins">{error}</p>}

                        <button
                            onClick={handleSubmit}
                            disabled={loading || !email}
                            className="w-full bg-linear-to-r from-[#F5C768] to-[#E88610] text-black font-poppins font-medium rounded-full py-3 hover:opacity-90 transition-opacity text-lg disabled:opacity-50"
                        >
                            {loading ? "Sending..." : "Send"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
