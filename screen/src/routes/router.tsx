import { createBrowserRouter } from "react-router";
import Onboarding from "../pages/onboarding/onboarding";
import Instructions from "../pages/instructions/instructions";
import Games from "../pages/games/games";
import Forms from "../pages/questionnaire/form1";
import Survey from "../pages/survey/survey";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Onboarding />,
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
