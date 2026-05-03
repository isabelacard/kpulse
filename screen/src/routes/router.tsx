import { createBrowserRouter } from "react-router";
import Onboarding from "../pages/onboarding/Onboarding";
import Games from "../pages/games/games";
import Forms from "../pages/questionnaire/form1";
import Forms2 from "../pages/questionnaire/form2";
import Forms3 from "../pages/questionnaire/form3";
import Forms4 from "../pages/questionnaire/form4";
import Forms5 from "../pages/questionnaire/form5";
import Formsfinal from "../pages/questionnaire/formfinal";
import Survey from "../pages/survey/survey";
import Onboarding2 from "../pages/onboarding/Onboarding2";
import Onboarding3 from "../pages/onboarding/Onboarding3";
import Onboarding4 from "../pages/onboarding/Onboarding4";
import Instructions1 from "../pages/instructions/Desktop/Instructios1";
import Instructions2 from "../pages/instructions/Desktop/Instructios2";
import Instructions3 from "../pages/instructions/Desktop/Instructios3";
import Instructions4 from "../pages/instructions/Desktop/Instructios4";
import Calibration1 from "../pages/instructions/Desktop/Calibration1";
import Calibration2 from "../pages/instructions/Desktop/Calibration2";
import InstructionsFinal from "../pages/instructions/Desktop/InstructionsFinal";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Onboarding />,
    },
    {
        path: "/onboarding2",
        element: <Onboarding2 />,
    },
    {
        path: "/onboarding3",
        element: <Onboarding3 />,
    },
    {
        path: "/onboarding4",
        element: <Onboarding4 />,
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
        path: "/game",
        element: <Games />,
    },
    {
        path: "/forms",
        element: <Forms />,
    },
    {
        path: "/forms2",
        element: <Forms2 />,
    },
    {
        path: "/forms3",
        element: <Forms3 />,
    },
    {
        path: "/forms4",
        element: <Forms4 />,
    },
    {
        path: "/forms5",
        element: <Forms5 />,
    },
    {
        path: "/formsfinal",
        element: <Formsfinal />,
    },
    {
        path: "/survey",
        element: <Survey />,
    },
]);

export default router;
