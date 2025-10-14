
export interface IBasicRepository<T> {
    findAll(): Promise<T[]>;
    findById<K extends keyof T>(id: K): Promise<T | null>;
    create(entity: T): Promise<T>;
    update(entity: Partial<T>): Promise<T>;
}