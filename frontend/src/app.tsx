import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "@/components/layout";
import { AssignmentPage } from "@/pages/assignment";
import { RootPage } from "@/pages/root";
import { rootPath, assignmentDetailPath } from "@/api/path";

const router = createBrowserRouter([
	{
		path: rootPath.pattern,
		element: <Layout />,
		children: [
			{
				path: rootPath.pattern,
				element: <RootPage />,
			},
			{
				path: assignmentDetailPath.pattern,
				element: <AssignmentPage />,
			},
		],
	},
]);

export function App() {
	return <RouterProvider router={router} />;
}
