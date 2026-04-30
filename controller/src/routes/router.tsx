import { createBrowserRouter } from "react-router-dom";
import Onboarding from "../pages/onboarding/onboarding";
import Instructions from "../pages/instructions/instructions";
import Game from "../pages/games/games";
import Forms from "../pages/form/form";
import Survey from "../pages/survey/survey";
import AllSetMb from "../pages/allset/AllSetMb";

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
    {
        path: "/allset",
        element: <AllSetMb />,
    },
]);

export default router;
