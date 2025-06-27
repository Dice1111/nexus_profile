import { DesignModel } from "../models/design.model";


export interface IDesignRepository {
    create: () => Promise<void>;
    update: () => Promise<void>;
    delete: () => Promise<void>;
    fetch: (cardID:string) => Promise<DesignModel>;
}