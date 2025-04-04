import { assignmentGetAllApiUrl, type AssignmentModel } from "@/api/assignmentApi";
import { AssignmentList } from "@/components/assignment";
import { useEffect, useState } from "react";

export function RootPage() {
	const [assignmentList, setAssignmentList] = useState<AssignmentModel[]>([]);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		fetch(assignmentGetAllApiUrl({}))
			.then((res) => res.json())
			.then(setAssignmentList)
			.catch(setError);
	}, []);

	if (error) return <div>An error has occurred: {error.message}</div>;

	if (!assignmentList) return <div className="text-center p-8">Loading...</div>;

	return (
		<>
			<div className="text-xl text-muted-foreground mt-5">Welcome back!</div>
			<div className="mt-10 text-lg text-center">
				<AssignmentList assignmentList={assignmentList} />
			</div>
		</>
	);
}
