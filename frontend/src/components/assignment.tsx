import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { assignmentDetailPath } from "@/api/path";
import { Link } from "react-router-dom";
import type { AssignmentModel } from "@/api/assignmentApi";

function AssignmentItem({ title, id }: AssignmentModel) {
	return (
		<TableRow>
			<TableCell>{id}</TableCell>
			<TableCell>{title}</TableCell>
			<TableCell>
				<Button asChild>
					<Link to={assignmentDetailPath({ id: id.toString() })}>Take quiz</Link>
				</Button>
			</TableCell>
		</TableRow>
	);
}


export function AssignmentList({ assignmentList }: { assignmentList: AssignmentModel[] }) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>ID</TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>{assignmentList.map((assignment) => AssignmentItem(assignment))}</TableBody>
		</Table>
	);
}
