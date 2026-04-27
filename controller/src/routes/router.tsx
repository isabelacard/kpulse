import { createBrowserRouter } from "react-router-dom";
import Onboarding from "../pages/onboarding/onboarding";
import Game from "../pages/games/games";
import Forms from "../pages/form/form";
import Survey from "../pages/survey/survey";
import CalibratingController from "../pages/instructions/CalibrationController";
import Instructions1Controller from "../pages/instructions/Instructions1Controller";
import Instructions2Controller from "../pages/instructions/Instructions2Controller";
import Instructions3Controller from "../pages/instructions/Instructions3Controller";

const router = createBrowserRouter([
    {
        path: "/instructions1mobile",
        element: <Instructions1Controller />,
    },
    {
        path: "/instructions2mobile",
        element: <Instructions2Controller />,
    },
    {
        path: "/instructions3mobile",
        element: <Instructions3Controller />,
    },
    {
        path: "/calibratingmobile",
        element: <CalibratingController />,
    },
    {
        path: "/",
        element: <Onboarding />,
    },
    {
        path: "/game",
        element: <Game />,
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
