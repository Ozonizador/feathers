-- auth.users
INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at") VALUES
('00000000-0000-0000-0000-000000000000', 'ab723c81-b13b-47b6-867c-091377e9b418', 'authenticated', 'authenticated', 'penas_4@hotmail.com', '', '2022-09-26 11:51:53.795909+00', NULL, '', NULL, '', NULL, '', '', NULL, '2022-12-06 12:27:16.706642+00', '{"provider": "facebook", "providers": ["facebook"]}', '{"iss": "https://graph.facebook.com/me?fields=email,first_name,last_name,name,picture", "sub": "10225823487991710", "name": "João Penas", "slug": "João Penas", "email": "penas_4@hotmail.com", "picture": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10225823487991710&height=50&width=50&ext=1672921636&hash=AeS66erlEp3lOMOsKAs", "nickname": "João Penas", "full_name": "João Penas", "avatar_url": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10225823487991710&height=50&width=50&ext=1672921636&hash=AeS66erlEp3lOMOsKAs", "provider_id": "10225823487991710", "email_verified": true}', NULL, '2022-09-26 11:51:53.787432+00', '2022-12-06 12:27:16.708685+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL),
('00000000-0000-0000-0000-000000000000', 'c4c7874c-a388-46c1-94db-5cb11839ff7b', 'authenticated', 'authenticated', 'castelhano6@gmail.com', '', '2022-12-06 12:25:29.912785+00', NULL, '', NULL, '52dab959d2bed95db26d737251e4f2aae7fb41c52cc7b04e81523efa', '2022-12-12 22:26:15.475581+00', '', '', NULL, '2022-12-12 22:25:33.990817+00', '{"provider": "google", "providers": ["google"]}', '{"iss": "https://www.googleapis.com/userinfo/v2/me", "sub": "100976025354732374225", "name": "Daniel Castelhano", "email": "castelhano6@gmail.com", "picture": "https://lh3.googleusercontent.com/a/AEdFTp6y4nHw-MNdBKME-DHMwt1cZ4Rhbo3MznfWcUtGGQ=s96-c", "full_name": "Daniel Castelhano", "avatar_url": "https://lh3.googleusercontent.com/a/AEdFTp6y4nHw-MNdBKME-DHMwt1cZ4Rhbo3MznfWcUtGGQ=s96-c", "provider_id": "100976025354732374225", "email_verified": true}', NULL, '2022-12-06 12:25:29.872518+00', '2022-12-12 22:26:16.872062+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL),
('00000000-0000-0000-0000-000000000000', '3a21df80-34be-435a-8c61-06da3c9e1caa', 'authenticated', 'authenticated', 'pcardoso.lei@gmail.com', '$2a$10$hXJV48jpj/9fiAcnuzaZou/7//lslrSZBbIUcro8AlblA3nC.JkrK', '2022-09-20 21:37:17.796445+00', NULL, '', NULL, '', NULL, '', '', NULL, '2022-12-07 12:40:02.488281+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2022-09-20 21:37:17.787685+00', '2022-12-12 22:21:10.984915+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL);

-- profiles
INSERT INTO "public"."profiles" ("id", "slug", "name", "surname", "nationality", "town", "birth_date", "gender", "description", "languages", "phone", "avatar_url", "favourite_rooms" ) VALUES
('3a21df80-34be-435a-8c61-06da3c9e1caa', 'profiletest', 'paulo', 'cardoso','portuguese', 'poto', '1992-11-05',1, 'OLA SOU O PAULO', NULL,NULL,NULL,NULL), 
('ab723c81-b13b-47b6-867c-091377e9b418','joao','joao','penas','portuguese','nazare', '1992-11-05',1, 'OLA SOU O JOAO', NULL,NULL, NULL, NULL),
('c4c7874c-a388-46c1-94db-5cb11839ff7b', 'castelhano', 'castelhano', 'developer', 'portuguese', 'nazare', '2000-01-01', 1, 'BOAS', NULL, NULL, NULL, NULL);

-- advertisements
INSERT INTO "public"."advertisements" ("id", "slug", "type", "place", "street", "street_number", "floor", "postal_code", "rooms", "beds", "tenant_number", "bathrooms", "title", "description", "type_flex_host", "type_host", "photos", "house_rules", "about_house", "month_rent", "extra_per_host", "guarantee_value", "expenses", "available", "host_lives_property", "verified", "host_id", "geom", "agreementsinfo") 
VALUES ('0a54f7fe-2fda-4d30-9767-954796daa5bd','aaaa', 'ENTIRE_SPACE', 'Nazare', 'Rua de Teste', '1', '1', '9999-111', 1, 1, 1, 1, 'Test de Anuncio', 'Description de Anuncio', 'FLEX', 'PROFISSIONAL', '[]', '{}', '{}', 300, 80, 100, '{}', 'AVAILABLE', false, false, '3a21df80-34be-435a-8c61-06da3c9e1caa', null, '{}');


-- reservations
INSERT INTO "public"."reservations" ("id", "start_date", "end_date", "advertisement_id", "status", "tenant_id") VALUES 
('bce866e4-109d-4ca3-852e-1b651190349e', '2023-02-03', '2023-02-03', '0a54f7fe-2fda-4d30-9767-954796daa5bd', 'REQUESTED', 'c4c7874c-a388-46c1-94db-5cb11839ff7b'),
('4b6d0fef-d4f0-4d5b-9e04-c4e92a83169a', '2023-03-04', '2023-03-05', '0a54f7fe-2fda-4d30-9767-954796daa5bd', 'REJECTED', 'ab723c81-b13b-47b6-867c-091377e9b418'),
('629e0125-dd17-46a5-ad3b-11de8f4e1bd6', '2032-05-01', '2032-08-01', '0a54f7fe-2fda-4d30-9767-954796daa5bd', 'ACCEPTED', 'ab723c81-b13b-47b6-867c-091377e9b418'),
('53d879c4-23b4-48a7-a89c-f5d25b675db3', '2023-01-01', '2023-12-31', '0a54f7fe-2fda-4d30-9767-954796daa5bd', 'ACCEPTED', 'c4c7874c-a388-46c1-94db-5cb11839ff7b');

-- stays
INSERT INTO "public"."stays" ("id", "advertisement_id", "tenant_id", "reservation_id", "status") VALUES
('d977b25a-855d-4707-bb12-ca9972abae8e', '0a54f7fe-2fda-4d30-9767-954796daa5bd', 'ab723c81-b13b-47b6-867c-091377e9b418', '629e0125-dd17-46a5-ad3b-11de8f4e1bd6','OK'),
('0dc9f1a2-566d-4211-92b8-0acee274f595', '0a54f7fe-2fda-4d30-9767-954796daa5bd', 'c4c7874c-a388-46c1-94db-5cb11839ff7b', '53d879c4-23b4-48a7-a89c-f5d25b675db3', 'OK');

-- reviews
INSERT INTO "public"."reviews" ("stay_id", "overall_rating", "location_rating", "value_quality_rating", "landlord_rating", "comodities_rating", "public_review", "private_review") VALUES
('d977b25a-855d-4707-bb12-ca9972abae8e', 1, 2, 3, 4,5, 'Tudo ok', 'Tudo ok. Obrigado');
