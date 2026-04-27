import { createBrowserRouter } from "react-router";
import Onboarding from "../pages/onboarding/onboarding";
import Instructions from "../pages/instructions/instructions";
import Games from "../pages/games/games";
import Forms from "../pages/questionnaire/form1";
import Forms2 from "../pages/questionnaire/form2";
import Forms3 from "../pages/questionnaire/form3";
import Forms4 from "../pages/questionnaire/form4";
import Forms5 from "../pages/questionnaire/form5";
import Formsfinal from "../pages/questionnaire/formfinal";
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
