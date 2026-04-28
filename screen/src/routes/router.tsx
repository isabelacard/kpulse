import { createBrowserRouter } from "react-router";
import Onboarding from "../pages/onboarding/onboarding";
import Instructions from "../pages/instructions/instructions";
import Games from "../pages/games/games";
import GameTwo from "../pages/games/gametwo/gametwo";
import CalibrateTwo from "../pages/games/gametwo/calibratetwo";
import StatsTwo from "../pages/games/gametwo/statstwo";
import Forms from "../pages/form/form";
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
        path: "/gametwo",
        element: <GameTwo />,
    },
    {
        path: "/calibratetwo",
        element: <CalibrateTwo />,
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
        path: "/survey",
        element: <Survey />,
    },
]);

export default router;
