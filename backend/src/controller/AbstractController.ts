import type { AbstractDb, IAbstractModel } from "../model/AbstractModel";

export class AbstractController<M extends IAbstractModel, D extends AbstractDb<M>> {
	protected modelDb: D;

	constructor(modelDb: D) {
		this.modelDb = modelDb;
	}

	getAll(): M[] {
		return this.modelDb.getAll();
	}

	get(id: number): M | undefined{
		return this.modelDb.get(id);
	}
}
