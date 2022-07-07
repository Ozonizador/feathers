import { JSONValue } from "./utils";

export interface Advertisement {
    id?: number, 
    type: "SUPER_FLEX" | "FLEX" | "MODERATE" | "RIGID",
    place: String,
    streetNumber: String,
    floor?: String,
    postalCode:        String,
    rooms:             number,
    beds:              number,
    tenantNumber:      number,
    bathrooms:         number,
    title:             String,
    description:       String,
    typeFlexHost:      "ENTIRE_SPACE" | "SHARED_ROOM" | "PRIVATE_ROOM",
    typeHost:          "PROFISSIONAL" | "PARTICULAR",
    photos?:            String[],
    houseRules:        JSONValue,
    aboutHouse:        JSONValue,
    monthRent:         number,
    extraPerHost:      number,
    guaranteeValue:    number,
    expenses:          JSONValue,
    hostLivesProperty: Boolean,
    host?:              number,
    createdAt?:         Date,     
    updatedAt?:         Date    
}   

  





