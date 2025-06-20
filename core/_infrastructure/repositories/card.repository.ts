import { ICardRepository } from "@/core/_domain/repositories/ICardRepository";

export class CardRepository implements ICardRepository {
    create(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(cardId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(cardId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    fetch(cardId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
    