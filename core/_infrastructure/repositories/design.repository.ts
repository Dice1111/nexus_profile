import { IDesignRepository } from "@/core/_domain/repositories/IDesignRepository";

export class DesignRepository implements IDesignRepository {
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