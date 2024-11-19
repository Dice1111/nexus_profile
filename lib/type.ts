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
    TEXT="text",
    LINK = "link",
    VIDEO = "video",
    MAP = "map",
    FILE = "file",
    SOCIAL = "social"
    
  }
  