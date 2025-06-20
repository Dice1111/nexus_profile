export interface ICardRepository{
    create: () => Promise<void>;
    update: (cardId: string) => Promise<void>;
    delete: (cardId: string) => Promise<void>;
    fetch: (cardId: string) => Promise<void>;
}