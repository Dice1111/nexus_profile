export interface ICardWithTitleAndID {
    id: string;
    title: string;
}

export interface IFetchCardWithInformationAndDesignData{
    id: string;
    title: string | null;
    Information: {
            id: number;
            cardId: string;
            title: string | null;
            fullName: string;
            occupation: string | null;
            company: string | null;
            message: string | null;
            quote: string | null;
            prefix: string | null;
            suffix: string | null;
            preferredName: string | null;
            pronouns: string | null;
    } | null;
    Design: {
            id: number;
            cardId: string;
            foregroundColor: string;
            backgroundColor: string;
            backgroundImage: string | null;
            profileImage: string | null;
            layout: string;
    }
}

