import { type Params, path as pathFactory } from "static-path";

const SERVER_HOST = import.meta.env.VITE_BACKEND_SERVER || "localhost:3001";
export const SERVER_ORIGIN = `http://${SERVER_HOST}`;

export const apiUrlFactory = <T extends string>(pattern: T) => {
	const builder = pathFactory(pattern);
	return (params: Params<T>) => SERVER_ORIGIN + builder(params);
};

// local routes
export const rootPath = pathFactory("/");
export const assignmentDetailPath = pathFactory("/assignmentDetail/:id");
export const assignmentListPath = pathFactory("/assignmentList");
