import { ICardRepository } from "@/core/_domain/repositories/ICardRepository";
import { ICardWithTitleAndID, IFetchCardWithInformationAndDesignData } from "@/core/_domain/repositories/types/card.types";

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
    fetch(cardId: string): Promise<ICardWithTitleAndID[ ]> {
        throw new Error("Method not implemented.");
    }
    fetchWithInformationAndDesign(cardId: string): Promise<IFetchCardWithInformationAndDesignData> {
        throw new Error("Method not implemented.");

        //
    }
}
    