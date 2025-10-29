import { IGenericRepository } from "../../core/abstracts";

export class GenericRepository<T> implements IGenericRepository<T> {
  private repository: any;

  constructor(repository: any) {
    this.repository = repository;
  }

  getAll(where?: any, include?: any): Promise<T[]> {
    return this.repository.findMany({
      where: where ?? {},
      include: include ?? {},
    });
  }

  get(id: any, include?: any): Promise<T> {
    return this.repository.findUnique({
      where: { id },
      include: include ?? {},
    });
  }

  create(item: T): Promise<T> {
    return this.repository.create({ data: item });
  }

  update(id: any, item: T): Promise<T> {
    return this.repository.update({
      where: { id },
      data: item,
    });
  }

  delete(id: any): Promise<T> {
    return this.repository.delete({
      where: { id },
    });
  }
}
