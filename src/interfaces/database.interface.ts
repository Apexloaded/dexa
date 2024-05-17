import { InsertOneResult, UpdateResult } from "mongodb";

export interface IDatabase<T> {
  find(
    filter: Partial<T>,
    page: number,
    limit: number,
    projection?: Partial<Record<keyof T, 1 | 0>>
  ): Promise<{ data: T[]; totalCount: number }>;

  create(payload: Partial<T>): Promise<InsertOneResult<Document> | undefined>;
  updateOne(
    filter: Partial<T>,
    payload: Partial<T>
  ): Promise<UpdateResult<Document> | undefined>;
}
