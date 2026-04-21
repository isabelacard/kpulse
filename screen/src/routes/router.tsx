import { createBrowserRouter } from "react-router";
import Onboarding from "../pages/onboarding/onboarding";
import Games from "../pages/games/games";
import Forms from "../pages/form/form";
import Survey from "../pages/survey/survey";
import Instructions1 from "../pages/instructions/Desktop/Instructios1";

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
