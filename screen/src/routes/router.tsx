import { createBrowserRouter } from "react-router";
import Onboarding from "../pages/onboarding/onboarding";
import Games from "../pages/games/games";
import Forms from "../pages/form/form";
import Survey from "../pages/survey/survey";
import Instructions1 from "../pages/instructions/Desktop/Instructios1";
import Instructions2 from "../pages/instructions/Desktop/Instructios2";
import Instructions3 from "../pages/instructions/Desktop/Instructios3";
import Instructions4 from "../pages/instructions/Desktop/Instructios4";
import Calibration1 from "../pages/instructions/Desktop/Calibration1";
import Calibration2 from "../pages/instructions/Desktop/Calibration2";
import InstructionsFinal from "../pages/instructions/Desktop/InstructionsFinal";
import Instructions1Mobile from "../pages/instructions/Mobile/Instructios1Mobile";
import Instructions2Mobile from "../pages/instructions/Mobile/Instructios2Mobile";
import Instructions3Mobile from "../pages/instructions/Mobile/Instructios3Mobile";
import CalibratingMobile from "../pages/instructions/Mobile/CalibratingMobile";

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
        path: "/instructions1mobile",
        element: <Instructions1Mobile />,
    },
    {
        path: "/instructions2",
        element: <Instructions2 />,
    },
    {
        path: "/instructions2mobile",
        element: <Instructions2Mobile />,
    },
    {
        path: "/instructions3",
        element: <Instructions3 />,
    },
    {
        path: "/instructions3mobile",
        element: <Instructions3Mobile />,
    },
    {
        path: "/instructions4",
        element: <Instructions4 />,
    },
    {
        path: "/calibratingmobile",
        element: <CalibratingMobile />,
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
        path: "/game",
        element: <Games />,
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
