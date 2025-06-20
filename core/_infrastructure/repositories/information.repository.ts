import { IInformationRepository } from "@/core/_domain/repositories/IInformationRepository";

export class InformationRepository implements IInformationRepository {
    create(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    fetch(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}