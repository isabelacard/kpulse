import { createBrowserRouter } from "react-router";
import Onboarding from "../pages/onboarding/Onboarding";
import Instructions from "../pages/instructions/instructions";
import Games from "../pages/games/games";
import Forms from "../pages/form/form";
import Survey from "../pages/survey/survey";
import Onboarding2 from "../pages/onboarding/Onboarding2";
import Onboarding3 from "../pages/onboarding/Onboarding3";
import Onboarding4 from "../pages/onboarding/Onboarding4";

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
        path: "/instructions",
        element: <Instructions />,
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
