CREATE TABLE host_rent_preferences (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    host_id uuid NOT NULL REFERENCES profiles(id),
    minimum_stay int NOT NULL DEFAULT 3,
    time_in_advance int NOT NULL DEFAULT 1, 
    trimester_discount int NOT NULL DEFAULT 0, 
    semester_discount int NOT NULL DEFAULT 0,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "host_rent_preferences_pkey" PRIMARY KEY ("id")
);
