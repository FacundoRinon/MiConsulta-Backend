export abstract class IGenericRepository<T> {
  abstract getAll(where?: any, include?: any): Promise<T[]>;
  abstract get(id: string, include?: any): Promise<T>;
  abstract create(item: T): Promise<T>;
  abstract update(id: string, item: T): Promise<T>;
  abstract delete(id: string): Promise<T>;
}
