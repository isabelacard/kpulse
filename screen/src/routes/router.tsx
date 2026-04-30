import { createBrowserRouter } from "react-router";
import Onboarding from "../pages/onboarding/onboarding";
import Instructions from "../pages/instructions/instructions";
import Games from "../pages/games/games";
import Forms from "../pages/form/form";
import Survey from "../pages/survey/survey";
import AllSet from "../pages/allset/AllSet";

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
    {
        path: "/allset",
        element: <AllSet />,
    },
]);

export default router;