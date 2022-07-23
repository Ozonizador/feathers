import Advertisement from "./advertisement";
import { Profile } from "./profile";

export const RESERVATION_TABLE_NAME = "reservations" as const;


export interface Reservation {
    id: string;
    startDate: Date,
    endDate: Date,
    status: ReservationStatus,
    advertisementId: String,
    tenantId: String

    advertisement?: Advertisement,
    tenant?: Profile

    createdAt: Date,
    updatedAt: Date,
}

export enum ReservationStatus {
    REQUESTED,
    ACCEPTED,
    REJECTED
}
