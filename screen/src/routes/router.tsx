import { createBrowserRouter } from "react-router";
import Onboarding from "../pages/onboarding/Onboarding";
import Forms from "../pages/questionnaire/form1";
import Forms2 from "../pages/questionnaire/form2";
import Forms3 from "../pages/questionnaire/form3";
import Forms4 from "../pages/questionnaire/form4";
import Forms5 from "../pages/questionnaire/form5";
import Formsfinal from "../pages/questionnaire/formfinal";
import GameTwo from "../pages/games/GameTwo/GameTwo";
import Pregametwo from "../pages/games/GameTwo/PreGametwo";
import StatsTwo from "../pages/games/GameTwo/StatsGameTwo";
import Survey from "../pages/survey/survey";
import Onboarding2 from "../pages/onboarding/Onboarding2";
import Onboarding3 from "../pages/onboarding/Onboarding3";
import Onboarding4 from "../pages/onboarding/Onboarding4";
import Instructions1 from "../pages/instructions/Instructions1";
import Instructions2 from "../pages/instructions/Instructions2";
import Instructions3 from "../pages/instructions/Instructions3";
import Instructions4 from "../pages/instructions/Instructions4";
import Calibration1 from "../pages/instructions/Calibration1";
import Calibration2 from "../pages/instructions/Calibration2";
import InstructionsFinal from "../pages/instructions/InstructionsFinal";
import PreGameOne from "../pages/games/GameOne/PreGameOne";
import GameOne from "../pages/games/GameOne/GameOne";
import StatsGameOne from "../pages/games/GameOne/StatsGameOne";
import AllSet from "../pages/allset/AllSet";
import Ending from "../pages/ending/Ending";

import { Outlet } from "react-router";
import SocketListener from "../components/SocketListener";

const router = createBrowserRouter([
    {
        element: (
            <SocketListener>
                <Outlet />
            </SocketListener>
        ),
        children: [
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
                path: "/gametwo",
                element: <GameTwo />,
            },
            {
                path: "/pregametwo",
                element: <Pregametwo />,
            },
            {
                path: "/statstwo",
                element: <StatsTwo />,
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
            {
                path: "/allset",
                element: <AllSet />,
            },
            {
                path: "/final",
                element: <Ending />,
            },
        ],
    },
]);

export default router;
