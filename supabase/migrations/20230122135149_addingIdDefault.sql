ALTER TABLE reviews ALTER COLUMN id SET DEFAULT uuid_generate_v4();
ALTER TABLE conversations ALTER COLUMN id SET DEFAULT uuid_generate_v4();
ALTER TABLE notifications ALTER COLUMN id SET DEFAULT uuid_generate_v4();
ALTER TABLE reports ALTER COLUMN id SET DEFAULT uuid_generate_v4();
ALTER TABLE reservations ALTER COLUMN id SET DEFAULT uuid_generate_v4();
ALTER TABLE messages ALTER COLUMN id SET DEFAULT uuid_generate_v4();