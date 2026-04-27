import { createBrowserRouter } from "react-router-dom";
import Onboarding from "../pages/onboarding/onboarding";
import Instructions from "../pages/instructions/instructions";
import Game from "../pages/games/games";
import Forms from "../pages/form/formmb";
import Forms2 from "../pages/form/form2mb";
import Forms3 from "../pages/form/form3mb";
import Forms4 from "../pages/form/form4mb";
import Forms5 from "../pages/form/form5mb";
import Formsfinal from "../pages/form/formmbfinal";
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
        element: <Game />,
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
]);

export default router;
