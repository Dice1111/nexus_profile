export interface IInformationRepository {
    create: () => Promise<void>;
    update: () => Promise<void>;
    delete: () => Promise<void>;
    fetch: () => Promise<void>;
}

