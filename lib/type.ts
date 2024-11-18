// types/itemTypes.ts

export type Item = {
    id: number;
    title: string;
    value: string;
    type: ITEM_TYPE;
  }
  
  export enum ITEM_TYPE {
    PHONE = "phone",
    EMAIL = "email",
    IMAGE = "img",
    TEXTAREA = "textarea",
    LINK = "link",
    VIDEO = "video",
    AUDIO = "audio",
  }
  