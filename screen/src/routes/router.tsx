import { createBrowserRouter } from "react-router";
import Onboarding from "../pages/onboarding/onboarding";
import Forms from "../pages/form/form";
import Survey from "../pages/survey/survey";
import Instructions1 from "../pages/instructions/Desktop/Instructios1";
import Instructions2 from "../pages/instructions/Desktop/Instructios2";
import Instructions3 from "../pages/instructions/Desktop/Instructios3";
import Instructions4 from "../pages/instructions/Desktop/Instructios4";
import Calibration1 from "../pages/instructions/Desktop/Calibration1";
import Calibration2 from "../pages/instructions/Desktop/Calibration2";
import InstructionsFinal from "../pages/instructions/Desktop/InstructionsFinal";
import PreGameOne from "../pages/games/PreGameOne";
import GameOne from "../pages/games/GameOne";
import StatsGameOne from "../pages/games/StatsGameOne";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Onboarding />,
    },
    {
        path: "/instructions1",
        element: <Instructions1 />,
    },
    {
        path: "/instructions2",
        element: <Instructions2 />,
    },
    {
        path: "/instructions3",
        element: <Instructions3 />,
    },
    {
        path: "/instructions4",
        element: <Instructions4 />,
    },
    {
        path: "/calibration1",
        element: <Calibration1 />,
    },
    {
        path: "/calibration2",
        element: <Calibration2 />,
    },
    {
        path: "/instructionsfinal",
        element: <InstructionsFinal />,
    },
    {
        path: "/pregameone",
        element: <PreGameOne />,
    },
    {
        path: "/gameone",
        element: <GameOne />,
    },
    {
        path: "/statsgameone",
        element: <StatsGameOne />,
    },
    {
        path: "/forms",
        element: <Forms />,
    },
    {
        path: "/survey",
        element: <Survey />,
    },
]);

export default router;
