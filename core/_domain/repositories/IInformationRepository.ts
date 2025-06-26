import { InformationModel } from "../models/information.model";

export interface IInformationRepository {
    create: () => Promise<void>;
    update: () => Promise<void>;
    delete: () => Promise<void>;
    fetch: (cardID:string) => Promise<InformationModel>;
}

