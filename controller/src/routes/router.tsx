import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import SocketListener from "../components/SocketListener";
import Forms from "../pages/form/formmb";
import Forms2 from "../pages/form/form2mb";
import Forms3 from "../pages/form/form3mb";
import Forms4 from "../pages/form/form4mb";
import Forms5 from "../pages/form/form5mb";
import Formsfinal from "../pages/form/formmbfinal";
import Survey from "../pages/survey/survey";
import OnboardingMb2 from "../pages/onboarding/OnboardingMb2";
import OnboardingMb3 from "../pages/onboarding/OnboardingMb3";
import OnboardingMb4 from "../pages/onboarding/OnboardingMb4";
import CalibratingController from "../pages/instructions/CalibrationController";
import Instructions1Controller from "../pages/instructions/Instructions1Controller";
import Instructions2Controller from "../pages/instructions/Instructions2Controller";
import Instructions3Controller from "../pages/instructions/Instructions3Controller";
import GameOneMobile from "../pages/games/GameOne";
import GameTwo from "../pages/games/gametwo/gametwo";
import AllSetMb from "../pages/allset/AllSetMb";
import EndindMb from "../pages/ending/EndingMb";

const router = createBrowserRouter([
    {
        element: (
            <SocketListener>
                <Outlet />
            </SocketListener>
        ),
        children: [
            { path: "/", element: <OnboardingMb2 /> },
            { path: "/onboarding2", element: <OnboardingMb2 /> },
            { path: "/onboarding3", element: <OnboardingMb3 /> },
            { path: "/onboarding4", element: <OnboardingMb4 /> },
            { path: "/instructions1mobile", element: <Instructions1Controller /> },
            { path: "/instructions2mobile", element: <Instructions2Controller /> },
            { path: "/instructions3mobile", element: <Instructions3Controller /> },
            { path: "/calibratingmobile", element: <CalibratingController /> },
            { path: "/gameonemobile", element: <GameOneMobile /> },
            { path: "/gametwo", element: <GameTwo /> },
            { path: "/forms", element: <Forms /> },
            { path: "/forms2", element: <Forms2 /> },
            { path: "/forms3", element: <Forms3 /> },
            { path: "/forms4", element: <Forms4 /> },
            { path: "/forms5", element: <Forms5 /> },
            { path: "/formsfinal", element: <Formsfinal /> },
            { path: "/survey", element: <Survey /> },
            { path: "/allset", element: <AllSetMb /> },
            { path: "/ending", element: <EndindMb /> },
            { path: "*", element: <Navigate to="/" replace /> },
        ],
    },
]);

export default router;
