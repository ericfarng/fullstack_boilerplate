import { db } from "./db-client";


export interface IAbstractModel{
    id: number;
    created_at: string;
}

export class AbstractDb<T extends IAbstractModel> {
    protected tableName: string;
  
    constructor(tableName: string) {
      this.tableName = tableName;
    }
  
    getAll(): T[] {
        const stmt = db.prepare(`SELECT * FROM ${this.tableName}`);
        return stmt.all() as T[];
      }
    
    get(id: number): T | undefined {
      const stmt = db.prepare(`SELECT * FROM ${this.tableName} WHERE id = :id`);
      return stmt.get({ id }) as T | undefined;
    }
  }