import { JSONValue } from "./utils";

export const ADVERTISEMENT_TABLE_NAME = "adverstisements"
/* MODEL */
export default interface Advertisement {
    id?: number, 
    typeFlexHost: "SUPER_FLEX" | "FLEX" | "MODERATE" | "RIGID",
    place: String,
    street: String,
    streetNumber: String,
    floor?: String,
    postalCode:        String,
    rooms:             number,
    beds:              number,
    tenantNumber:      number,
    bathrooms:         number,
    title:             String,
    description:       String,
    type:      "ENTIRE_SPACE" | "SHARED_ROOM" | "PRIVATE_ROOM",
    typeHost:          "PROFISSIONAL" | "PARTICULAR",
    photos?:           String[],
    houseRules:        JSONValue,
    aboutHouse:        JSONValue,
    monthRent:         number,
    extraPerHost:      number,
    guaranteeValue:    number,
    expenses:          JSONValue,
    hostLivesProperty: Boolean,
    host?:             number,
    createdAt?:        Date,     
    updatedAt?:        Date    
}   

/* VALUES FOR DB */

export const ADVERTISEMENT_PROPERTIES = {
    TYPE_FLEX_HOST: "typeFlexHost",
    TYPE: "type",
    TYPE_HOST: "typeHost",
    PLACE: "place",
    STREET: "street",
    STREET_NUMBER: "streetNumber",
    FLOOR: "floor",
    POSTAL_CODE: "postalCode",
    ROOMS: "rooms",
    BEDS: "beds",
    NUMBER_TENANT: "tenantNumber",
    BATHROOMS: "bathrooms",
    TITLE: "title",
    DESCRIPTION: "description",
    PHOTOS: "photos",
    HOUSE_RULES: "houseRules",
    ABOUT_HOUSE: "aboutHouse",
    MONTH_RENT: "monthRent",
    EXTRA_PER_HOST: "extraPerHost",
    GUARANTEE_VALUE:"guaranteeValue",
    EXPENSES:"expenses",
    HOST_LIVES_PROPERTY: "hostLivesProperty",
    HOST: "host"
}  


/* ENUMS */
export const TYPE_ADVERTISEMENT = {
    "Apartamento Inteiro": "ENTIRE_SPACE",
    "Quarto Partilhado": "SHARED_ROOM",
    "Quarto Privado": "PRIVATE_ROOM"
}

export enum HOST_TYPE {
    PROFISSIONAL = "PROFISSIONAL",
    PARTICULAR = "PARTICULAR" 
}

export enum FLEX_HOST_TYPE {
    SUPER_FLEX = "SUPER_FLEX",
    FLEX = "FLEX",
    MODERATE = "MODERATE",
    RIGID = "RIGID"
}



