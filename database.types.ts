import { AdvertisementInfo, AdvertisementPhoto, HouseExpenses, HouseRules } from "./models/advertisement";
export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      advertisements: {
        Row: {
          agreementsinfo: AdvertisementInfo | null;
          available: Database["public"]["Enums"]["AdvertisementStatus"];
          bathroom_amenities: string[] | null;
          bathrooms: number;
          bedroom_amenities: string[] | null;
          beds: number;
          created_at: string;
          description: string;
          expenses: HouseExpenses;
          exterior_amenities: string[] | null;
          extra_per_host: number;
          floor: string | null;
          general_amenities: string[] | null;
          geom: unknown | null;
          guarantee_value: number;
          host_id: string;
          host_lives_property: boolean;
          house_rules: HouseRules;
          id: string;
          kitchen_amenities: string[] | null;
          livingroom_amenities: string[] | null;
          minimum_stay: number;
          month_rent: number;
          months_notif_in_advance: number;
          photos: AdvertisementPhoto[];
          place: string;
          postal_code: string;
          rooms: number;
          semester_discount: number;
          slug: string;
          street: string;
          street_number: string;
          tenant_number: number;
          title: string;
          trimester_discount: number;
          type: Database["public"]["Enums"]["TypeRoom"];
          type_flex_host: Database["public"]["Enums"]["HostFlexType"];
          type_host: Database["public"]["Enums"]["type_host"];
          updated_at: string;
          verified: boolean;
        };
        Insert: {
          agreementsinfo?: AdvertisementInfo | null;
          available: Database["public"]["Enums"]["AdvertisementStatus"];
          bathroom_amenities?: string[] | null;
          bathrooms: number;
          bedroom_amenities?: string[] | null;
          beds: number;
          created_at?: string;
          description: string;
          expenses: HouseExpenses;
          exterior_amenities?: string[] | null;
          extra_per_host: number;
          floor?: string | null;
          general_amenities?: string[] | null;
          geom?: unknown | null;
          guarantee_value: number;
          host_id: string;
          host_lives_property: boolean;
          house_rules: HouseRules;
          id?: string;
          kitchen_amenities?: string[] | null;
          livingroom_amenities?: string[] | null;
          minimum_stay?: number;
          month_rent: number;
          months_notif_in_advance?: number;
          photos?: AdvertisementPhoto[];
          place: string;
          postal_code: string;
          rooms: number;
          semester_discount?: number;
          slug: string;
          street: string;
          street_number: string;
          tenant_number: number;
          title: string;
          trimester_discount?: number;
          type: Database["public"]["Enums"]["TypeRoom"];
          type_flex_host: Database["public"]["Enums"]["HostFlexType"];
          type_host: Database["public"]["Enums"]["type_host"];
          updated_at?: string;
          verified?: boolean;
        };
        Update: {
          agreementsinfo?: AdvertisementInfo | null;
          available?: Database["public"]["Enums"]["AdvertisementStatus"];
          bathroom_amenities?: string[] | null;
          bathrooms?: number;
          bedroom_amenities?: string[] | null;
          beds?: number;
          created_at?: string;
          description?: string;
          expenses?: HouseExpenses;
          exterior_amenities?: string[] | null;
          extra_per_host?: number;
          floor?: string | null;
          general_amenities?: string[] | null;
          geom?: unknown | null;
          guarantee_value?: number;
          host_id?: string;
          host_lives_property?: boolean;
          house_rules?: HouseRules;
          id?: string;
          kitchen_amenities?: string[] | null;
          livingroom_amenities?: string[] | null;
          minimum_stay?: number;
          month_rent?: number;
          months_notif_in_advance?: number;
          photos?: AdvertisementPhoto[];
          place?: string;
          postal_code?: string;
          rooms?: number;
          semester_discount?: number;
          slug?: string;
          street?: string;
          street_number?: string;
          tenant_number?: number;
          title?: string;
          trimester_discount?: number;
          type?: Database["public"]["Enums"]["TypeRoom"];
          type_flex_host?: Database["public"]["Enums"]["HostFlexType"];
          type_host?: Database["public"]["Enums"]["type_host"];
          updated_at?: string;
          verified?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "advertisements_host_id_fkey";
            columns: ["host_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      blogs: {
        Row: {
          category: Database["public"]["Enums"]["BlogCategory"];
          created_at: string;
          description: string;
          id: string;
          image: string;
          slug: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          category: Database["public"]["Enums"]["BlogCategory"];
          created_at?: string;
          description: string;
          id?: string;
          image: string;
          slug: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          category?: Database["public"]["Enums"]["BlogCategory"];
          created_at?: string;
          description?: string;
          id?: string;
          image?: string;
          slug?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      conversations: {
        Row: {
          created_at: string;
          host_id: string;
          id: string;
          reservation_id: string;
          tenant_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          host_id: string;
          id?: string;
          reservation_id: string;
          tenant_id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          host_id?: string;
          id?: string;
          reservation_id?: string;
          tenant_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "conversations_host_id_fkey";
            columns: ["host_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "conversations_reservation_id_fkey";
            columns: ["reservation_id"];
            referencedRelation: "reservations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "conversations_tenant_id_fkey";
            columns: ["tenant_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      faqs: {
        Row: {
          answer: string;
          created_at: string;
          id: string;
          question: string;
          type: Database["public"]["Enums"]["BlogCategory"];
          updated_at: string;
        };
        Insert: {
          answer: string;
          created_at?: string;
          id?: string;
          question: string;
          type: Database["public"]["Enums"]["BlogCategory"];
          updated_at?: string;
        };
        Update: {
          answer?: string;
          created_at?: string;
          id?: string;
          question?: string;
          type?: Database["public"]["Enums"]["BlogCategory"];
          updated_at?: string;
        };
        Relationships: [];
      };
      messages: {
        Row: {
          conversation_id: string;
          created_at: string;
          id: string;
          message: string;
          profile_id: string;
          seen: boolean;
          updated_at: string;
        };
        Insert: {
          conversation_id: string;
          created_at?: string;
          id?: string;
          message: string;
          profile_id: string;
          seen?: boolean;
          updated_at?: string;
        };
        Update: {
          conversation_id?: string;
          created_at?: string;
          id?: string;
          message?: string;
          profile_id?: string;
          seen?: boolean;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey";
            columns: ["conversation_id"];
            referencedRelation: "conversations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "messages_profile_id_fkey";
            columns: ["profile_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      payment_methods: {
        Row: {
          created_at: string;
          id: string;
          iban: string;
          swift: string;
          profile_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          swift?: string;
          profile_id: string;
          iban?: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          swift?: string;
          profile_id?: string;
          iban?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "messages_profile_id_fkey";
            columns: ["profile_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      notifications: {
        Row: {
          created_at: string;
          id: string;
          profile_id: string;
          seen: boolean;
          type: Database["public"]["Enums"]["NotificationType"];
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          profile_id: string;
          seen?: boolean;
          type: Database["public"]["Enums"]["NotificationType"];
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          profile_id?: string;
          seen?: boolean;
          type?: Database["public"]["Enums"]["NotificationType"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "notifications_profile_id_fkey";
            columns: ["profile_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          accepts_notification_email: boolean | null;
          accepts_notification_message: boolean | null;
          avatar_url: string | null;
          birth_date: string | null;
          created_at: string;
          description: string | null;
          email: string | null;
          favourite_rooms: string[] | null;
          gender: number | null;
          id: string;
          languages: string[] | null;
          name: string | null;
          nationality: string | null;
          phone: string | null;
          prefered_unidesk_state: Database["public"]["Enums"]["profiletype"];
          slug: string;
          surname: string | null;
          town: string | null;
          type: Database["public"]["Enums"]["profiletype"] | null;
          updated_at: string;
          user_type: Database["public"]["Enums"]["user_type"];
        };
        Insert: {
          accepts_notification_email?: boolean | null;
          accepts_notification_message?: boolean | null;
          avatar_url?: string | null;
          birth_date?: string | null;
          created_at?: string;
          description?: string | null;
          email?: string | null;
          favourite_rooms?: string[] | null;
          gender?: number | null;
          id?: string;
          languages?: string[] | null;
          name?: string | null;
          nationality?: string | null;
          phone?: string | null;
          prefered_unidesk_state?: Database["public"]["Enums"]["profiletype"];
          slug: string;
          surname?: string | null;
          town?: string | null;
          type?: Database["public"]["Enums"]["profiletype"] | null;
          updated_at?: string;
          user_type?: Database["public"]["Enums"]["user_type"];
        };
        Update: {
          accepts_notification_email?: boolean | null;
          accepts_notification_message?: boolean | null;
          avatar_url?: string | null;
          birth_date?: string | null;
          created_at?: string;
          description?: string | null;
          email?: string | null;
          favourite_rooms?: string[] | null;
          gender?: number | null;
          id?: string;
          languages?: string[] | null;
          name?: string | null;
          nationality?: string | null;
          phone?: string | null;
          prefered_unidesk_state?: Database["public"]["Enums"]["profiletype"];
          slug?: string;
          surname?: string | null;
          town?: string | null;
          type?: Database["public"]["Enums"]["profiletype"] | null;
          updated_at?: string;
          user_type?: Database["public"]["Enums"]["user_type"];
        };
        Relationships: [];
      };
      deactivation: {
        Row: {
          id: string;
          reason: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          reason: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          reason: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      reports: {
        Row: {
          created_at: string;
          description: string;
          id: string;
          reservation_id: string;
          type: Database["public"]["Enums"]["ReportsType"];
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description: string;
          id?: string;
          reservation_id: string;
          type: Database["public"]["Enums"]["ReportsType"];
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          id?: string;
          reservation_id?: string;
          type?: Database["public"]["Enums"]["ReportsType"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reports_reservation_id_fkey";
            columns: ["reservation_id"];
            referencedRelation: "reservations";
            referencedColumns: ["id"];
          }
        ];
      };
      reservation_payments: {
        Row: {
          created_at: string;
          entidade: string | null;
          estado: Database["public"]["Enums"]["paymentstatus"];
          id: string;
          metadata: Json;
          payment_type: Database["public"]["Enums"]["paymenttype"];
          referencia: string;
          reservation_id: string;
          updated_at: string;
          valor: number;
        };
        Insert: {
          created_at?: string;
          entidade?: string | null;
          estado: Database["public"]["Enums"]["paymentstatus"];
          id?: string;
          metadata?: Json;
          payment_type: Database["public"]["Enums"]["paymenttype"];
          referencia: string;
          reservation_id: string;
          updated_at?: string;
          valor: number;
        };
        Update: {
          created_at?: string;
          entidade?: string | null;
          estado?: Database["public"]["Enums"]["paymentstatus"];
          id?: string;
          metadata?: Json;
          payment_type?: Database["public"]["Enums"]["paymenttype"];
          referencia?: string;
          reservation_id?: string;
          updated_at?: string;
          valor?: number;
        };
        Relationships: [
          {
            foreignKeyName: "reservation_payments_reservation_id_fkey";
            columns: ["reservation_id"];
            referencedRelation: "reservations";
            referencedColumns: ["id"];
          }
        ];
      };
      reservations: {
        Row: {
          advertisement_id: string;
          created_at: string;
          end_date: string;
          id: string;
          number_guests: number;
          payment_status: Database["public"]["Enums"]["payment_status_type"] | null;
          previous_stay: string | null;
          start_date: string;
          status: Database["public"]["Enums"]["ReservationStatus"];
          tenant_id: string;
          updated_at: string;
        };
        Insert: {
          advertisement_id: string;
          created_at?: string;
          end_date: string;
          id?: string;
          number_guests?: number;
          payment_status?: Database["public"]["Enums"]["payment_status_type"] | null;
          previous_stay?: string | null;
          start_date: string;
          status: Database["public"]["Enums"]["ReservationStatus"];
          tenant_id: string;
          updated_at?: string;
        };
        Update: {
          advertisement_id?: string;
          created_at?: string;
          end_date?: string;
          id?: string;
          number_guests?: number;
          payment_status?: Database["public"]["Enums"]["payment_status_type"] | null;
          previous_stay?: string | null;
          start_date?: string;
          status?: Database["public"]["Enums"]["ReservationStatus"];
          tenant_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reservations_advertisement_id_fkey";
            columns: ["advertisement_id"];
            referencedRelation: "advertisements";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reservations_advertisement_id_fkey";
            columns: ["advertisement_id"];
            referencedRelation: "advertisements_agg_amenities";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reservations_previous_stay_fkey";
            columns: ["previous_stay"];
            referencedRelation: "reservations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reservations_tenant_id_fkey";
            columns: ["tenant_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      reviews: {
        Row: {
          comodities_rating: number;
          created_at: string;
          id: string;
          landlord_rating: number;
          location_rating: number;
          overall_rating: number;
          private_review: string;
          public_review: string;
          reservation_id: string;
          updated_at: string;
          value_quality_rating: number;
        };
        Insert: {
          comodities_rating: number;
          created_at?: string;
          id?: string;
          landlord_rating: number;
          location_rating: number;
          overall_rating: number;
          private_review: string;
          public_review: string;
          reservation_id: string;
          updated_at?: string;
          value_quality_rating: number;
        };
        Update: {
          comodities_rating?: number;
          created_at?: string;
          id?: string;
          landlord_rating?: number;
          location_rating?: number;
          overall_rating?: number;
          private_review?: string;
          public_review?: string;
          reservation_id?: string;
          updated_at?: string;
          value_quality_rating?: number;
        };
        Relationships: [
          {
            foreignKeyName: "reviews_reservation_id_fkey";
            columns: ["reservation_id"];
            referencedRelation: "reservations";
            referencedColumns: ["id"];
          }
        ];
      };
      spatial_ref_sys: {
        Row: {
          auth_name: string | null;
          auth_srid: number | null;
          proj4text: string | null;
          srid: number;
          srtext: string | null;
        };
        Insert: {
          auth_name?: string | null;
          auth_srid?: number | null;
          proj4text?: string | null;
          srid: number;
          srtext?: string | null;
        };
        Update: {
          auth_name?: string | null;
          auth_srid?: number | null;
          proj4text?: string | null;
          srid?: number;
          srtext?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      advertisements_agg_amenities: {
        Row: {
          agreementsinfo: Json | null;
          amenities: string[] | null;
          available: Database["public"]["Enums"]["AdvertisementStatus"] | null;
          bathroom_amenities: string[] | null;
          bathrooms: number | null;
          bedroom_amenities: string[] | null;
          beds: number | null;
          created_at: string | null;
          description: string | null;
          expenses: Json | null;
          exterior_amenities: string[] | null;
          extra_per_host: number | null;
          floor: string | null;
          general_amenities: string[] | null;
          geom: unknown | null;
          guarantee_value: number | null;
          host_id: string | null;
          host_lives_property: boolean | null;
          house_rules: Json | null;
          id: string | null;
          kitchen_amenities: string[] | null;
          livingroom_amenities: string[] | null;
          minimum_stay: number | null;
          month_rent: number | null;
          months_notif_in_advance: number | null;
          photos: Json | null;
          place: string | null;
          postal_code: string | null;
          rooms: number | null;
          semester_discount: number | null;
          slug: string | null;
          street: string | null;
          street_number: string | null;
          tenant_number: number | null;
          title: string | null;
          trimester_discount: number | null;
          type: Database["public"]["Enums"]["TypeRoom"] | null;
          type_flex_host: Database["public"]["Enums"]["HostFlexType"] | null;
          type_host: Database["public"]["Enums"]["type_host"] | null;
          updated_at: string | null;
          verified: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: "advertisements_host_id_fkey";
            columns: ["host_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      geography_columns: {
        Row: {
          coord_dimension: number | null;
          f_geography_column: unknown | null;
          f_table_catalog: unknown | null;
          f_table_name: unknown | null;
          f_table_schema: unknown | null;
          srid: number | null;
          type: string | null;
        };
        Relationships: [];
      };
      geometry_columns: {
        Row: {
          coord_dimension: number | null;
          f_geometry_column: unknown | null;
          f_table_catalog: string | null;
          f_table_name: unknown | null;
          f_table_schema: unknown | null;
          srid: number | null;
          type: string | null;
        };
        Insert: {
          coord_dimension?: number | null;
          f_geometry_column?: unknown | null;
          f_table_catalog?: string | null;
          f_table_name?: unknown | null;
          f_table_schema?: unknown | null;
          srid?: number | null;
          type?: string | null;
        };
        Update: {
          coord_dimension?: number | null;
          f_geometry_column?: unknown | null;
          f_table_catalog?: string | null;
          f_table_name?: unknown | null;
          f_table_schema?: unknown | null;
          srid?: number | null;
          type?: string | null;
        };
        Relationships: [];
      };
      reviewsPerAdvertisement: {
        Row: {
          advertisement_id: string | null;
          comodities_average: number | null;
          landlord_average: number | null;
          location_average: number | null;
          overall_average: number | null;
          review_number: number | null;
          value_quality_average: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "reservations_advertisement_id_fkey";
            columns: ["advertisement_id"];
            referencedRelation: "advertisements";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reservations_advertisement_id_fkey";
            columns: ["advertisement_id"];
            referencedRelation: "advertisements_agg_amenities";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Functions: {
      _postgis_deprecate: {
        Args: {
          oldname: string;
          newname: string;
          version: string;
        };
        Returns: undefined;
      };
      _postgis_index_extent: {
        Args: {
          tbl: unknown;
          col: string;
        };
        Returns: unknown;
      };
      _postgis_pgsql_version: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      _postgis_scripts_pgsql_version: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      _postgis_selectivity: {
        Args: {
          tbl: unknown;
          att_name: string;
          geom: unknown;
          mode?: string;
        };
        Returns: number;
      };
      _st_3dintersects: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      _st_bestsrid: {
        Args: {
          "": unknown;
        };
        Returns: number;
      };
      _st_concavehull: {
        Args: {
          param_inputgeom: unknown;
        };
        Returns: unknown;
      };
      _st_contains: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      _st_containsproperly: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      _st_coveredby:
        | {
            Args: {
              geom1: unknown;
              geom2: unknown;
            };
            Returns: boolean;
          }
        | {
            Args: {
              geog1: unknown;
              geog2: unknown;
            };
            Returns: boolean;
          };
      _st_covers:
        | {
            Args: {
              geom1: unknown;
              geom2: unknown;
            };
            Returns: boolean;
          }
        | {
            Args: {
              geog1: unknown;
              geog2: unknown;
            };
            Returns: boolean;
          };
      _st_crosses: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      _st_dwithin: {
        Args: {
          geog1: unknown;
          geog2: unknown;
          tolerance: number;
          use_spheroid?: boolean;
        };
        Returns: boolean;
      };
      _st_equals: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      _st_intersects: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      _st_linecrossingdirection: {
        Args: {
          line1: unknown;
          line2: unknown;
        };
        Returns: number;
      };
      _st_longestline: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: unknown;
      };
      _st_maxdistance: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: number;
      };
      _st_orderingequals: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      _st_overlaps: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      _st_pointoutside: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      _st_sortablehash: {
        Args: {
          geom: unknown;
        };
        Returns: number;
      };
      _st_touches: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      _st_voronoi: {
        Args: {
          g1: unknown;
          clip?: unknown;
          tolerance?: number;
          return_polygons?: boolean;
        };
        Returns: unknown;
      };
      _st_within: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      addauth: {
        Args: {
          "": string;
        };
        Returns: boolean;
      };
      addgeometrycolumn:
        | {
            Args: {
              catalog_name: string;
              schema_name: string;
              table_name: string;
              column_name: string;
              new_srid_in: number;
              new_type: string;
              new_dim: number;
              use_typmod?: boolean;
            };
            Returns: string;
          }
        | {
            Args: {
              schema_name: string;
              table_name: string;
              column_name: string;
              new_srid: number;
              new_type: string;
              new_dim: number;
              use_typmod?: boolean;
            };
            Returns: string;
          }
        | {
            Args: {
              table_name: string;
              column_name: string;
              new_srid: number;
              new_type: string;
              new_dim: number;
              use_typmod?: boolean;
            };
            Returns: string;
          };
      average_per_host: {
        Args: {
          host: string;
        };
        Returns: number;
      };
      average_rating_per_host: {
        Args: {
          hostid: string;
        };
        Returns: number;
      };
      box:
        | {
            Args: {
              "": unknown;
            };
            Returns: unknown;
          }
        | {
            Args: {
              "": unknown;
            };
            Returns: unknown;
          };
      box2d:
        | {
            Args: {
              "": unknown;
            };
            Returns: unknown;
          }
        | {
            Args: {
              "": unknown;
            };
            Returns: unknown;
          };
      box2d_in: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      box2d_out: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      box2df_in: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      box2df_out: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      box3d:
        | {
            Args: {
              "": unknown;
            };
            Returns: unknown;
          }
        | {
            Args: {
              "": unknown;
            };
            Returns: unknown;
          };
      box3d_in: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      box3d_out: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      box3dtobox: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      bytea:
        | {
            Args: {
              "": unknown;
            };
            Returns: string;
          }
        | {
            Args: {
              "": unknown;
            };
            Returns: string;
          };
      close_advertisements: {
        Args: {
          lat: number;
          lng: number;
        };
        Returns: {
          agreementsinfo: AdvertisementInfo | null;
          available: Database["public"]["Enums"]["AdvertisementStatus"];
          bathroom_amenities: string[] | null;
          bathrooms: number;
          bedroom_amenities: string[] | null;
          beds: number;
          created_at: string;
          description: string;
          expenses: Json;
          exterior_amenities: string[] | null;
          extra_per_host: number;
          floor: string | null;
          general_amenities: string[] | null;
          geom: unknown | null;
          guarantee_value: number;
          host_id: string;
          host_lives_property: boolean;
          house_rules: HouseRules;
          id: string;
          kitchen_amenities: string[] | null;
          livingroom_amenities: string[] | null;
          minimum_stay: number;
          month_rent: number;
          months_notif_in_advance: number;
          photos: AdvertisementPhoto[];
          place: string;
          postal_code: string;
          rooms: number;
          semester_discount: number;
          slug: string;
          street: string;
          street_number: string;
          tenant_number: number;
          title: string;
          trimester_discount: number;
          type: Database["public"]["Enums"]["TypeRoom"];
          type_flex_host: Database["public"]["Enums"]["HostFlexType"];
          type_host: Database["public"]["Enums"]["type_host"];
          updated_at: string;
          verified: boolean;
        }[];
      };
      disablelongtransactions: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      dropgeometrycolumn:
        | {
            Args: {
              catalog_name: string;
              schema_name: string;
              table_name: string;
              column_name: string;
            };
            Returns: string;
          }
        | {
            Args: {
              schema_name: string;
              table_name: string;
              column_name: string;
            };
            Returns: string;
          }
        | {
            Args: {
              table_name: string;
              column_name: string;
            };
            Returns: string;
          };
      dropgeometrytable:
        | {
            Args: {
              catalog_name: string;
              schema_name: string;
              table_name: string;
            };
            Returns: string;
          }
        | {
            Args: {
              schema_name: string;
              table_name: string;
            };
            Returns: string;
          }
        | {
            Args: {
              table_name: string;
            };
            Returns: string;
          };
      enablelongtransactions: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      equals: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      geography:
        | {
            Args: {
              "": string;
            };
            Returns: unknown;
          }
        | {
            Args: {
              "": unknown;
            };
            Returns: unknown;
          };
      geography_analyze: {
        Args: {
          "": unknown;
        };
        Returns: boolean;
      };
      geography_gist_compress: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      geography_gist_decompress: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      geography_out: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      geography_send: {
        Args: {
          "": unknown;
        };
        Returns: string;
      };
      geography_spgist_compress_nd: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      geography_typmod_in: {
        Args: {
          "": unknown[];
        };
        Returns: number;
      };
      geography_typmod_out: {
        Args: {
          "": number;
        };
        Returns: unknown;
      };
      geometry:
        | {
            Args: {
              "": unknown;
            };
            Returns: unknown;
          }
        | {
            Args: {
              "": unknown;
            };
            Returns: unknown;
          }
        | {
            Args: {
              "": unknown;
            };
            Returns: unknown;
          }
        | {
            Args: {
              "": unknown;
            };
            Returns: unknown;
          }
        | {
            Args: {
              "": unknown;
            };
            Returns: unknown;
          }
        | {
            Args: {
              "": string;
            };
            Returns: unknown;
          }
        | {
            Args: {
              "": string;
            };
            Returns: unknown;
          }
        | {
            Args: {
              "": unknown;
            };
            Returns: unknown;
          };
      geometry_above: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      geometry_analyze: {
        Args: {
          "": unknown;
        };
        Returns: boolean;
      };
      geometry_below: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      geometry_cmp: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: number;
      };
      geometry_contained_3d: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      geometry_contains: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      geometry_contains_3d: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      geometry_distance_box: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: number;
      };
      geometry_distance_centroid: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: number;
      };
      geometry_eq: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      geometry_ge: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      geometry_gist_compress_2d: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      geometry_gist_compress_nd: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      geometry_gist_decompress_2d: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      geometry_gist_decompress_nd: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      geometry_gt: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      geometry_hash: {
        Args: {
          "": unknown;
        };
        Returns: number;
      };
      geometry_in: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      geometry_le: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      geometry_left: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      geometry_lt: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      geometry_out: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      geometry_overabove: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      geometry_overbelow: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      geometry_overlaps: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      geometry_overlaps_3d: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      geometry_overleft: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      geometry_overright: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      geometry_recv: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      geometry_right: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      geometry_same: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      geometry_same_3d: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      geometry_send: {
        Args: {
          "": unknown;
        };
        Returns: string;
      };
      geometry_sortsupport: {
        Args: {
          "": unknown;
        };
        Returns: undefined;
      };
      geometry_spgist_compress_2d: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      geometry_spgist_compress_3d: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      geometry_spgist_compress_nd: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      geometry_typmod_in: {
        Args: {
          "": unknown[];
        };
        Returns: number;
      };
      geometry_typmod_out: {
        Args: {
          "": number;
        };
        Returns: unknown;
      };
      geometry_within: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      geometrytype:
        | {
            Args: {
              "": unknown;
            };
            Returns: string;
          }
        | {
            Args: {
              "": unknown;
            };
            Returns: string;
          };
      geomfromewkb: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      geomfromewkt: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      get_proj4_from_srid: {
        Args: {
          "": number;
        };
        Returns: string;
      };
      gettransactionid: {
        Args: Record<PropertyKey, never>;
        Returns: unknown;
      };
      gidx_in: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      gidx_out: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      host_general_info: {
        Args: {
          hostid: string;
        };
        Returns: {
          number_conversations: number;
          conversations_answered: number;
        }[];
      };
      json: {
        Args: {
          "": unknown;
        };
        Returns: Json;
      };
      jsonb: {
        Args: {
          "": unknown;
        };
        Returns: Json;
      };
      longtransactionsenabled: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      modify_reservation: {
        Args: {
          reservation_id: string;
          reservation_status: Database["public"]["Enums"]["ReservationStatus"];
          stay_id?: string;
        };
        Returns: {
          advertisement_id: string;
          created_at: string;
          end_date: string;
          id: string;
          number_guests: number;
          payment_status: Database["public"]["Enums"]["payment_status_type"] | null;
          previous_stay: string | null;
          start_date: string;
          status: Database["public"]["Enums"]["ReservationStatus"];
          tenant_id: string;
          updated_at: string;
        }[];
      };
      path: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      pgis_asgeobuf_finalfn: {
        Args: {
          "": unknown;
        };
        Returns: string;
      };
      pgis_asmvt_finalfn: {
        Args: {
          "": unknown;
        };
        Returns: string;
      };
      pgis_asmvt_serialfn: {
        Args: {
          "": unknown;
        };
        Returns: string;
      };
      pgis_geometry_clusterintersecting_finalfn: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      pgis_geometry_clusterwithin_finalfn: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      pgis_geometry_collect_finalfn: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      pgis_geometry_makeline_finalfn: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      pgis_geometry_polygonize_finalfn: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      pgis_geometry_union_finalfn: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      point: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      polygon: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      populate_geometry_columns:
        | {
            Args: {
              use_typmod?: boolean;
            };
            Returns: string;
          }
        | {
            Args: {
              tbl_oid: unknown;
              use_typmod?: boolean;
            };
            Returns: number;
          };
      postgis_addbbox: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      postgis_constraint_dims: {
        Args: {
          geomschema: string;
          geomtable: string;
          geomcolumn: string;
        };
        Returns: number;
      };
      postgis_constraint_srid: {
        Args: {
          geomschema: string;
          geomtable: string;
          geomcolumn: string;
        };
        Returns: number;
      };
      postgis_constraint_type: {
        Args: {
          geomschema: string;
          geomtable: string;
          geomcolumn: string;
        };
        Returns: string;
      };
      postgis_dropbbox: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      postgis_extensions_upgrade: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      postgis_full_version: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      postgis_geos_noop: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      postgis_geos_version: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      postgis_getbbox: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      postgis_hasbbox: {
        Args: {
          "": unknown;
        };
        Returns: boolean;
      };
      postgis_index_supportfn: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      postgis_lib_build_date: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      postgis_lib_revision: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      postgis_lib_version: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      postgis_libjson_version: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      postgis_liblwgeom_version: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      postgis_libprotobuf_version: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      postgis_libxml_version: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      postgis_noop: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      postgis_proj_version: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      postgis_scripts_build_date: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      postgis_scripts_installed: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      postgis_scripts_released: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      postgis_svn_version: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      postgis_type_name: {
        Args: {
          geomname: string;
          coord_dimension: number;
          use_new_name?: boolean;
        };
        Returns: string;
      };
      postgis_typmod_dims: {
        Args: {
          "": number;
        };
        Returns: number;
      };
      postgis_typmod_srid: {
        Args: {
          "": number;
        };
        Returns: number;
      };
      postgis_typmod_type: {
        Args: {
          "": number;
        };
        Returns: string;
      };
      postgis_version: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      postgis_wagyu_version: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      spheroid_in: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      spheroid_out: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      st_3dclosestpoint: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: unknown;
      };
      st_3ddistance: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: number;
      };
      st_3dintersects: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      st_3dlength: {
        Args: {
          "": unknown;
        };
        Returns: number;
      };
      st_3dlongestline: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: unknown;
      };
      st_3dmakebox: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: unknown;
      };
      st_3dmaxdistance: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: number;
      };
      st_3dperimeter: {
        Args: {
          "": unknown;
        };
        Returns: number;
      };
      st_3dshortestline: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: unknown;
      };
      st_addpoint: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: unknown;
      };
      st_angle:
        | {
            Args: {
              pt1: unknown;
              pt2: unknown;
              pt3: unknown;
              pt4?: unknown;
            };
            Returns: number;
          }
        | {
            Args: {
              line1: unknown;
              line2: unknown;
            };
            Returns: number;
          };
      st_area:
        | {
            Args: {
              "": unknown;
            };
            Returns: number;
          }
        | {
            Args: {
              geog: unknown;
              use_spheroid?: boolean;
            };
            Returns: number;
          }
        | {
            Args: {
              "": string;
            };
            Returns: number;
          };
      st_area2d: {
        Args: {
          "": unknown;
        };
        Returns: number;
      };
      st_asbinary:
        | {
            Args: {
              "": unknown;
            };
            Returns: string;
          }
        | {
            Args: {
              "": unknown;
            };
            Returns: string;
          };
      st_asencodedpolyline: {
        Args: {
          geom: unknown;
          nprecision?: number;
        };
        Returns: string;
      };
      st_asewkb: {
        Args: {
          "": unknown;
        };
        Returns: string;
      };
      st_asewkt:
        | {
            Args: {
              "": unknown;
            };
            Returns: string;
          }
        | {
            Args: {
              "": unknown;
            };
            Returns: string;
          }
        | {
            Args: {
              "": string;
            };
            Returns: string;
          };
      st_asgeojson:
        | {
            Args: {
              geom: unknown;
              maxdecimaldigits?: number;
              options?: number;
            };
            Returns: string;
          }
        | {
            Args: {
              r: Record<string, unknown>;
              geom_column?: string;
              maxdecimaldigits?: number;
              pretty_bool?: boolean;
            };
            Returns: string;
          }
        | {
            Args: {
              geog: unknown;
              maxdecimaldigits?: number;
              options?: number;
            };
            Returns: string;
          }
        | {
            Args: {
              "": string;
            };
            Returns: string;
          };
      st_asgml:
        | {
            Args: {
              geom: unknown;
              maxdecimaldigits?: number;
              options?: number;
            };
            Returns: string;
          }
        | {
            Args: {
              version: number;
              geom: unknown;
              maxdecimaldigits?: number;
              options?: number;
              nprefix?: string;
              id?: string;
            };
            Returns: string;
          }
        | {
            Args: {
              version: number;
              geog: unknown;
              maxdecimaldigits?: number;
              options?: number;
              nprefix?: string;
              id?: string;
            };
            Returns: string;
          }
        | {
            Args: {
              geog: unknown;
              maxdecimaldigits?: number;
              options?: number;
              nprefix?: string;
              id?: string;
            };
            Returns: string;
          }
        | {
            Args: {
              "": string;
            };
            Returns: string;
          };
      st_ashexewkb: {
        Args: {
          "": unknown;
        };
        Returns: string;
      };
      st_askml:
        | {
            Args: {
              geom: unknown;
              maxdecimaldigits?: number;
              nprefix?: string;
            };
            Returns: string;
          }
        | {
            Args: {
              geog: unknown;
              maxdecimaldigits?: number;
              nprefix?: string;
            };
            Returns: string;
          }
        | {
            Args: {
              "": string;
            };
            Returns: string;
          };
      st_aslatlontext: {
        Args: {
          geom: unknown;
          tmpl?: string;
        };
        Returns: string;
      };
      st_asmvtgeom: {
        Args: {
          geom: unknown;
          bounds: unknown;
          extent?: number;
          buffer?: number;
          clip_geom?: boolean;
        };
        Returns: unknown;
      };
      st_assvg:
        | {
            Args: {
              geom: unknown;
              rel?: number;
              maxdecimaldigits?: number;
            };
            Returns: string;
          }
        | {
            Args: {
              geog: unknown;
              rel?: number;
              maxdecimaldigits?: number;
            };
            Returns: string;
          }
        | {
            Args: {
              "": string;
            };
            Returns: string;
          };
      st_astext:
        | {
            Args: {
              "": unknown;
            };
            Returns: string;
          }
        | {
            Args: {
              "": unknown;
            };
            Returns: string;
          }
        | {
            Args: {
              "": string;
            };
            Returns: string;
          };
      st_astwkb:
        | {
            Args: {
              geom: unknown;
              prec?: number;
              prec_z?: number;
              prec_m?: number;
              with_sizes?: boolean;
              with_boxes?: boolean;
            };
            Returns: string;
          }
        | {
            Args: {
              geom: unknown[];
              ids: number[];
              prec?: number;
              prec_z?: number;
              prec_m?: number;
              with_sizes?: boolean;
              with_boxes?: boolean;
            };
            Returns: string;
          };
      st_asx3d: {
        Args: {
          geom: unknown;
          maxdecimaldigits?: number;
          options?: number;
        };
        Returns: string;
      };
      st_azimuth:
        | {
            Args: {
              geom1: unknown;
              geom2: unknown;
            };
            Returns: number;
          }
        | {
            Args: {
              geog1: unknown;
              geog2: unknown;
            };
            Returns: number;
          };
      st_boundary: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      st_boundingdiagonal: {
        Args: {
          geom: unknown;
          fits?: boolean;
        };
        Returns: unknown;
      };
      st_buffer:
        | {
            Args: {
              geom: unknown;
              radius: number;
              options?: string;
            };
            Returns: unknown;
          }
        | {
            Args: {
              geom: unknown;
              radius: number;
              quadsegs: number;
            };
            Returns: unknown;
          };
      st_buildarea: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      st_centroid:
        | {
            Args: {
              "": unknown;
            };
            Returns: unknown;
          }
        | {
            Args: {
              "": string;
            };
            Returns: unknown;
          };
      st_cleangeometry: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      st_clipbybox2d: {
        Args: {
          geom: unknown;
          box: unknown;
        };
        Returns: unknown;
      };
      st_closestpoint: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: unknown;
      };
      st_clusterintersecting: {
        Args: {
          "": unknown[];
        };
        Returns: unknown;
      };
      st_collect:
        | {
            Args: {
              geom1: unknown;
              geom2: unknown;
            };
            Returns: unknown;
          }
        | {
            Args: {
              "": unknown[];
            };
            Returns: unknown;
          };
      st_collectionextract: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      st_collectionhomogenize: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      st_concavehull: {
        Args: {
          param_geom: unknown;
          param_pctconvex: number;
          param_allow_holes?: boolean;
        };
        Returns: unknown;
      };
      st_contains: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      st_containsproperly: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      st_convexhull: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      st_coorddim: {
        Args: {
          geometry: unknown;
        };
        Returns: number;
      };
      st_coveredby:
        | {
            Args: {
              geom1: unknown;
              geom2: unknown;
            };
            Returns: boolean;
          }
        | {
            Args: {
              geog1: unknown;
              geog2: unknown;
            };
            Returns: boolean;
          };
      st_covers:
        | {
            Args: {
              geom1: unknown;
              geom2: unknown;
            };
            Returns: boolean;
          }
        | {
            Args: {
              geog1: unknown;
              geog2: unknown;
            };
            Returns: boolean;
          };
      st_crosses: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      st_curvetoline: {
        Args: {
          geom: unknown;
          tol?: number;
          toltype?: number;
          flags?: number;
        };
        Returns: unknown;
      };
      st_delaunaytriangles: {
        Args: {
          g1: unknown;
          tolerance?: number;
          flags?: number;
        };
        Returns: unknown;
      };
      st_difference: {
        Args: {
          geom1: unknown;
          geom2: unknown;
          gridsize?: number;
        };
        Returns: unknown;
      };
      st_dimension: {
        Args: {
          "": unknown;
        };
        Returns: number;
      };
      st_disjoint: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      st_distance:
        | {
            Args: {
              geom1: unknown;
              geom2: unknown;
            };
            Returns: number;
          }
        | {
            Args: {
              geog1: unknown;
              geog2: unknown;
              use_spheroid?: boolean;
            };
            Returns: number;
          };
      st_distancesphere: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: number;
      };
      st_dump: {
        Args: {
          "": unknown;
        };
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][];
      };
      st_dumppoints: {
        Args: {
          "": unknown;
        };
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][];
      };
      st_dumprings: {
        Args: {
          "": unknown;
        };
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][];
      };
      st_dwithin: {
        Args: {
          geog1: unknown;
          geog2: unknown;
          tolerance: number;
          use_spheroid?: boolean;
        };
        Returns: boolean;
      };
      st_endpoint: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      st_envelope: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      st_equals: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      st_expand:
        | {
            Args: {
              box: unknown;
              dx: number;
              dy: number;
            };
            Returns: unknown;
          }
        | {
            Args: {
              box: unknown;
              dx: number;
              dy: number;
              dz?: number;
            };
            Returns: unknown;
          }
        | {
            Args: {
              geom: unknown;
              dx: number;
              dy: number;
              dz?: number;
              dm?: number;
            };
            Returns: unknown;
          };
      st_exteriorring: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      st_flipcoordinates: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      st_force2d: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      st_force3d: {
        Args: {
          geom: unknown;
          zvalue?: number;
        };
        Returns: unknown;
      };
      st_force3dm: {
        Args: {
          geom: unknown;
          mvalue?: number;
        };
        Returns: unknown;
      };
      st_force3dz: {
        Args: {
          geom: unknown;
          zvalue?: number;
        };
        Returns: unknown;
      };
      st_force4d: {
        Args: {
          geom: unknown;
          zvalue?: number;
          mvalue?: number;
        };
        Returns: unknown;
      };
      st_forcecollection: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      st_forcecurve: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      st_forcepolygonccw: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      st_forcepolygoncw: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      st_forcerhr: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      st_forcesfs: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      st_generatepoints:
        | {
            Args: {
              area: unknown;
              npoints: number;
            };
            Returns: unknown;
          }
        | {
            Args: {
              area: unknown;
              npoints: number;
              seed: number;
            };
            Returns: unknown;
          };
      st_geogfromtext: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_geogfromwkb: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_geographyfromtext: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_geohash:
        | {
            Args: {
              geom: unknown;
              maxchars?: number;
            };
            Returns: string;
          }
        | {
            Args: {
              geog: unknown;
              maxchars?: number;
            };
            Returns: string;
          };
      st_geomcollfromtext: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_geomcollfromwkb: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_geometricmedian: {
        Args: {
          g: unknown;
          tolerance?: number;
          max_iter?: number;
          fail_if_not_converged?: boolean;
        };
        Returns: unknown;
      };
      st_geometryfromtext: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_geometrytype: {
        Args: {
          "": unknown;
        };
        Returns: string;
      };
      st_geomfromewkb: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_geomfromewkt: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_geomfromgeojson:
        | {
            Args: {
              "": Json;
            };
            Returns: unknown;
          }
        | {
            Args: {
              "": string;
            };
            Returns: unknown;
          }
        | {
            Args: {
              "": Json;
            };
            Returns: unknown;
          };
      st_geomfromgml: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_geomfromkml: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_geomfromtext: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_geomfromtwkb: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_geomfromwkb: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_gmltosql: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_hasarc: {
        Args: {
          geometry: unknown;
        };
        Returns: boolean;
      };
      st_hausdorffdistance: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: number;
      };
      st_hexagon: {
        Args: {
          size: number;
          cell_i: number;
          cell_j: number;
          origin?: unknown;
        };
        Returns: unknown;
      };
      st_hexagongrid: {
        Args: {
          size: number;
          bounds: unknown;
        };
        Returns: Record<string, unknown>[];
      };
      st_interpolatepoint: {
        Args: {
          line: unknown;
          point: unknown;
        };
        Returns: number;
      };
      st_intersection: {
        Args: {
          geom1: unknown;
          geom2: unknown;
          gridsize?: number;
        };
        Returns: unknown;
      };
      st_intersects:
        | {
            Args: {
              geom1: unknown;
              geom2: unknown;
            };
            Returns: boolean;
          }
        | {
            Args: {
              geog1: unknown;
              geog2: unknown;
            };
            Returns: boolean;
          };
      st_isclosed: {
        Args: {
          "": unknown;
        };
        Returns: boolean;
      };
      st_iscollection: {
        Args: {
          "": unknown;
        };
        Returns: boolean;
      };
      st_isempty: {
        Args: {
          "": unknown;
        };
        Returns: boolean;
      };
      st_ispolygonccw: {
        Args: {
          "": unknown;
        };
        Returns: boolean;
      };
      st_ispolygoncw: {
        Args: {
          "": unknown;
        };
        Returns: boolean;
      };
      st_isring: {
        Args: {
          "": unknown;
        };
        Returns: boolean;
      };
      st_issimple: {
        Args: {
          "": unknown;
        };
        Returns: boolean;
      };
      st_isvalid: {
        Args: {
          "": unknown;
        };
        Returns: boolean;
      };
      st_isvaliddetail: {
        Args: {
          geom: unknown;
          flags?: number;
        };
        Returns: Database["public"]["CompositeTypes"]["valid_detail"];
      };
      st_isvalidreason: {
        Args: {
          "": unknown;
        };
        Returns: string;
      };
      st_isvalidtrajectory: {
        Args: {
          "": unknown;
        };
        Returns: boolean;
      };
      st_length:
        | {
            Args: {
              "": unknown;
            };
            Returns: number;
          }
        | {
            Args: {
              geog: unknown;
              use_spheroid?: boolean;
            };
            Returns: number;
          }
        | {
            Args: {
              "": string;
            };
            Returns: number;
          };
      st_length2d: {
        Args: {
          "": unknown;
        };
        Returns: number;
      };
      st_linecrossingdirection: {
        Args: {
          line1: unknown;
          line2: unknown;
        };
        Returns: number;
      };
      st_linefromencodedpolyline: {
        Args: {
          txtin: string;
          nprecision?: number;
        };
        Returns: unknown;
      };
      st_linefrommultipoint: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      st_linefromtext: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_linefromwkb: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_linelocatepoint: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: number;
      };
      st_linemerge: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      st_linestringfromwkb: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_linetocurve: {
        Args: {
          geometry: unknown;
        };
        Returns: unknown;
      };
      st_locatealong: {
        Args: {
          geometry: unknown;
          measure: number;
          leftrightoffset?: number;
        };
        Returns: unknown;
      };
      st_locatebetween: {
        Args: {
          geometry: unknown;
          frommeasure: number;
          tomeasure: number;
          leftrightoffset?: number;
        };
        Returns: unknown;
      };
      st_locatebetweenelevations: {
        Args: {
          geometry: unknown;
          fromelevation: number;
          toelevation: number;
        };
        Returns: unknown;
      };
      st_longestline: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: unknown;
      };
      st_m: {
        Args: {
          "": unknown;
        };
        Returns: number;
      };
      st_makebox2d: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: unknown;
      };
      st_makeline:
        | {
            Args: {
              "": unknown[];
            };
            Returns: unknown;
          }
        | {
            Args: {
              geom1: unknown;
              geom2: unknown;
            };
            Returns: unknown;
          };
      st_makepolygon: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      st_makevalid: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      st_maxdistance: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: number;
      };
      st_maximuminscribedcircle: {
        Args: {
          "": unknown;
        };
        Returns: Record<string, unknown>;
      };
      st_memsize: {
        Args: {
          "": unknown;
        };
        Returns: number;
      };
      st_minimumboundingcircle: {
        Args: {
          inputgeom: unknown;
          segs_per_quarter?: number;
        };
        Returns: unknown;
      };
      st_minimumboundingradius: {
        Args: {
          "": unknown;
        };
        Returns: Record<string, unknown>;
      };
      st_minimumclearance: {
        Args: {
          "": unknown;
        };
        Returns: number;
      };
      st_minimumclearanceline: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      st_mlinefromtext: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_mlinefromwkb: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_mpointfromtext: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_mpointfromwkb: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_mpolyfromtext: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_mpolyfromwkb: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_multi: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      st_multilinefromwkb: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_multilinestringfromtext: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_multipointfromtext: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_multipointfromwkb: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_multipolyfromwkb: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_multipolygonfromtext: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_ndims: {
        Args: {
          "": unknown;
        };
        Returns: number;
      };
      st_node: {
        Args: {
          g: unknown;
        };
        Returns: unknown;
      };
      st_normalize: {
        Args: {
          geom: unknown;
        };
        Returns: unknown;
      };
      st_npoints: {
        Args: {
          "": unknown;
        };
        Returns: number;
      };
      st_nrings: {
        Args: {
          "": unknown;
        };
        Returns: number;
      };
      st_numgeometries: {
        Args: {
          "": unknown;
        };
        Returns: number;
      };
      st_numinteriorring: {
        Args: {
          "": unknown;
        };
        Returns: number;
      };
      st_numinteriorrings: {
        Args: {
          "": unknown;
        };
        Returns: number;
      };
      st_numpatches: {
        Args: {
          "": unknown;
        };
        Returns: number;
      };
      st_numpoints: {
        Args: {
          "": unknown;
        };
        Returns: number;
      };
      st_offsetcurve: {
        Args: {
          line: unknown;
          distance: number;
          params?: string;
        };
        Returns: unknown;
      };
      st_orderingequals: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      st_orientedenvelope: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      st_overlaps: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      st_perimeter:
        | {
            Args: {
              "": unknown;
            };
            Returns: number;
          }
        | {
            Args: {
              geog: unknown;
              use_spheroid?: boolean;
            };
            Returns: number;
          };
      st_perimeter2d: {
        Args: {
          "": unknown;
        };
        Returns: number;
      };
      st_pointfromtext: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_pointfromwkb: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_pointonsurface: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      st_points: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      st_polyfromtext: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_polyfromwkb: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_polygonfromtext: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_polygonfromwkb: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_polygonize: {
        Args: {
          "": unknown[];
        };
        Returns: unknown;
      };
      st_project: {
        Args: {
          geog: unknown;
          distance: number;
          azimuth: number;
        };
        Returns: unknown;
      };
      st_quantizecoordinates: {
        Args: {
          g: unknown;
          prec_x: number;
          prec_y?: number;
          prec_z?: number;
          prec_m?: number;
        };
        Returns: unknown;
      };
      st_reduceprecision: {
        Args: {
          geom: unknown;
          gridsize: number;
        };
        Returns: unknown;
      };
      st_relate: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: string;
      };
      st_removerepeatedpoints: {
        Args: {
          geom: unknown;
          tolerance?: number;
        };
        Returns: unknown;
      };
      st_reverse: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      st_segmentize: {
        Args: {
          geog: unknown;
          max_segment_length: number;
        };
        Returns: unknown;
      };
      st_setsrid:
        | {
            Args: {
              geom: unknown;
              srid: number;
            };
            Returns: unknown;
          }
        | {
            Args: {
              geog: unknown;
              srid: number;
            };
            Returns: unknown;
          };
      st_sharedpaths: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: unknown;
      };
      st_shiftlongitude: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      st_shortestline: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: unknown;
      };
      st_split: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: unknown;
      };
      st_square: {
        Args: {
          size: number;
          cell_i: number;
          cell_j: number;
          origin?: unknown;
        };
        Returns: unknown;
      };
      st_squaregrid: {
        Args: {
          size: number;
          bounds: unknown;
        };
        Returns: Record<string, unknown>[];
      };
      st_srid:
        | {
            Args: {
              geom: unknown;
            };
            Returns: number;
          }
        | {
            Args: {
              geog: unknown;
            };
            Returns: number;
          };
      st_startpoint: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      st_subdivide: {
        Args: {
          geom: unknown;
          maxvertices?: number;
          gridsize?: number;
        };
        Returns: unknown[];
      };
      st_summary:
        | {
            Args: {
              "": unknown;
            };
            Returns: string;
          }
        | {
            Args: {
              "": unknown;
            };
            Returns: string;
          };
      st_swapordinates: {
        Args: {
          geom: unknown;
          ords: unknown;
        };
        Returns: unknown;
      };
      st_symdifference: {
        Args: {
          geom1: unknown;
          geom2: unknown;
          gridsize?: number;
        };
        Returns: unknown;
      };
      st_symmetricdifference: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: unknown;
      };
      st_tileenvelope: {
        Args: {
          zoom: number;
          x: number;
          y: number;
          bounds?: unknown;
          margin?: number;
        };
        Returns: unknown;
      };
      st_touches: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      st_transform:
        | {
            Args: {
              geom: unknown;
              to_proj: string;
            };
            Returns: unknown;
          }
        | {
            Args: {
              geom: unknown;
              from_proj: string;
              to_proj: string;
            };
            Returns: unknown;
          }
        | {
            Args: {
              geom: unknown;
              from_proj: string;
              to_srid: number;
            };
            Returns: unknown;
          };
      st_union:
        | {
            Args: {
              geom1: unknown;
              geom2: unknown;
            };
            Returns: unknown;
          }
        | {
            Args: {
              geom1: unknown;
              geom2: unknown;
              gridsize: number;
            };
            Returns: unknown;
          }
        | {
            Args: {
              "": unknown[];
            };
            Returns: unknown;
          };
      st_voronoilines: {
        Args: {
          g1: unknown;
          tolerance?: number;
          extend_to?: unknown;
        };
        Returns: unknown;
      };
      st_voronoipolygons: {
        Args: {
          g1: unknown;
          tolerance?: number;
          extend_to?: unknown;
        };
        Returns: unknown;
      };
      st_within: {
        Args: {
          geom1: unknown;
          geom2: unknown;
        };
        Returns: boolean;
      };
      st_wkbtosql: {
        Args: {
          wkb: string;
        };
        Returns: unknown;
      };
      st_wkttosql: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      st_wrapx: {
        Args: {
          geom: unknown;
          wrap: number;
          move: number;
        };
        Returns: unknown;
      };
      st_x: {
        Args: {
          "": unknown;
        };
        Returns: number;
      };
      st_xmax: {
        Args: {
          "": unknown;
        };
        Returns: number;
      };
      st_xmin: {
        Args: {
          "": unknown;
        };
        Returns: number;
      };
      st_y: {
        Args: {
          "": unknown;
        };
        Returns: number;
      };
      st_ymax: {
        Args: {
          "": unknown;
        };
        Returns: number;
      };
      st_ymin: {
        Args: {
          "": unknown;
        };
        Returns: number;
      };
      st_z: {
        Args: {
          "": unknown;
        };
        Returns: number;
      };
      st_zmax: {
        Args: {
          "": unknown;
        };
        Returns: number;
      };
      st_zmflag: {
        Args: {
          "": unknown;
        };
        Returns: number;
      };
      st_zmin: {
        Args: {
          "": unknown;
        };
        Returns: number;
      };
      text: {
        Args: {
          "": unknown;
        };
        Returns: string;
      };
      unlockrows: {
        Args: {
          "": string;
        };
        Returns: number;
      };
      updategeometrysrid: {
        Args: {
          catalogn_name: string;
          schema_name: string;
          table_name: string;
          column_name: string;
          new_srid_in: number;
        };
        Returns: string;
      };
    };
    Enums: {
      AdvertisementStatus: "AVAILABLE" | "DISABLED" | "NOT_AVAILABLE";
      BlogCategory: "LANDLORD" | "TENANT";
      HostFlexType: "SUPER_FLEX" | "FLEX" | "MODERATE" | "RIGID";
      NotificationType:
        | "STUDENT_EVALUATE_STAY"
        | "STUDENT_RESERVATION_DECLINED"
        | "STUDENT_RESERVATION_ACCEPTED"
        | "STUDENT_UNIHOSTS_SUPPORT"
        | "STUDENT_COMPLETE_PROFILE"
        | "LANDLORD_RESERVATION_RECEIVED"
        | "LANDLORD_UNIHOSTS_SUPPORT"
        | "LANDLORD_NEW_REVIEW"
        | "LANDLORD_COMPLETE_PROFILE"
        | "LANDLORD_COMPLETE_ADVERT"
        | "BLOG";
      payment_status_type: "NOT_GENERATED" | "PENDING" | "PAID" | "CANCELED" | "REFUNDED" | "EXPIRED";
      paymentstatus: "PAID" | "EXPIRED" | "ERROR" | "REFUNDED" | "CANCELED" | "PENDING";
      paymenttype: "MULTIBANCO" | "MBWAY";
      profiletype: "LANDLORD" | "TENANT";
      ReportsType: "IMPRECISE" | "NOT_REALITY" | "SCAM" | "OFFENSIVE" | "OTHER";
      ReservationStatus:
        | "REQUESTED"
        | "ACCEPTED"
        | "REJECTED"
        | "CHANGE_REQUESTED"
        | "CHANGE_ACCEPTED"
        | "CHANGE_REJECTED"
        | "EXPIRED";
      staysstatus: "OK" | "CHANGED";
      type_host: "PROFISSIONAL" | "PARTICULAR";
      TypeRoom: "ENTIRE_SPACE" | "SHARED_ROOM" | "PRIVATE_ROOM";
      user_type: "NORMAL" | "ADMIN";
    };
    CompositeTypes: {
      geometry_dump: {
        path: unknown;
        geom: unknown;
      };
      valid_detail: {
        valid: boolean;
        reason: string;
        location: unknown;
      };
    };
  };
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null;
          avif_autodetection: boolean | null;
          created_at: string | null;
          file_size_limit: number | null;
          id: string;
          name: string;
          owner: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id: string;
          name: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id?: string;
          name?: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey";
            columns: ["owner"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
          version: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey";
            columns: ["bucket_id"];
            referencedRelation: "buckets";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "objects_owner_fkey";
            columns: ["owner"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string;
          name: string;
          owner: string;
          metadata: Json;
        };
        Returns: undefined;
      };
      extension: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      filename: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      foldername: {
        Args: {
          name: string;
        };
        Returns: unknown;
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: {
          size: number;
          bucket_id: string;
        }[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
