export const STAYS_TABLE_NAME = "stays" as const;

export interface Stay {
  id?: string;
  startDate: Date;
  endDate: Date;
  reservationId: String;

  createdAt?: Date;
  updatedAt?: Date;
}

export const STAY_TABLE = {
  ID: "id",
  RESERVATION_ID: "advertisementId",
} as const;
