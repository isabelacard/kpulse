import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import SocketListener from "../components/SocketListener";
import Forms from "../pages/questionnaire/Questionnaire1";
import Forms2 from "../pages/questionnaire/Questionnaire2";
import Forms3 from "../pages/questionnaire/Questionnaire3";
import Forms4 from "../pages/questionnaire/Questionnaire4";
import Forms5 from "../pages/questionnaire/Questionnaire5";
import Formsfinal from "../pages/questionnaire/QuestionnaireFinal";
import Survey from "../pages/survey/survey";
import Onboarding2 from "../pages/onboarding/Onboarding2";
import Onboarding3 from "../pages/onboarding/Onboarding3";
import Onboarding4 from "../pages/onboarding/Onboarding4";
import Calibration from "../pages/instructions/Calibration";
import Instructions1 from "../pages/instructions/Instructions1";
import Instructions2 from "../pages/instructions/Instructions2";
import Instructions3 from "../pages/instructions/Instructions3";
import GameOneMobile from "../pages/games/GameOne/GameOne";
import GameTwo from "../pages/games/GameTwo/GameTwo";
import AllSet from "../pages/allset/AllSet";
import Ending from "../pages/ending/Ending";

const router = createBrowserRouter([
    {
        element: (
            <SocketListener>
                <Outlet />
            </SocketListener>
        ),
        children: [
            { path: "/", element: <Onboarding2 /> },
            { path: "/onboarding2", element: <Onboarding2 /> },
            { path: "/onboarding3", element: <Onboarding3 /> },
            { path: "/onboarding4", element: <Onboarding4 /> },
            { path: "/instructions1mobile", element: <Instructions1 /> },
            { path: "/instructions2mobile", element: <Instructions2 /> },
            { path: "/instructions3mobile", element: <Instructions3 /> },
            { path: "/calibratingmobile", element: <Calibration /> },
            { path: "/gameonemobile", element: <GameOneMobile /> },
            { path: "/gametwo", element: <GameTwo /> },
            { path: "/forms", element: <Forms /> },
            { path: "/forms2", element: <Forms2 /> },
            { path: "/forms3", element: <Forms3 /> },
            { path: "/forms4", element: <Forms4 /> },
            { path: "/forms5", element: <Forms5 /> },
            { path: "/formsfinal", element: <Formsfinal /> },
            { path: "/survey", element: <Survey /> },
            { path: "/allset", element: <AllSet /> },
            { path: "/ending", element: <Ending /> },
            { path: "*", element: <Navigate to="/" replace /> },
        ],
    },
]);

export default router;
