import {
    createBrowserRouter,
} from "react-router-dom";

import ComponentForm from './components/ComponentForm.jsx';
import NavBar from './components/NavBar.jsx';
import VehicleForm from './components/VehicleForm.jsx';
import IssueForm from './components/IssueForm.jsx';
import RevenueChart from "./components/RevenueChart.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <NavBar />,
        errorElement: <h1> Error </h1>,
        children: [
            {
                path: "components",
                element: <ComponentForm />,
            },
            {
                path: "vehicles",
                element: <VehicleForm />,
            },
            {
                path: "add-issue",
                element: <IssueForm />,
            },
            {
                path: "revenue",
                element: <RevenueChart />,
            },
        ],
    },
]);

export default router;