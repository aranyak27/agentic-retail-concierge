export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      agent_action_logs: {
        Row: {
          agent_type: Database["public"]["Enums"]["agent_type"]
          context: Json | null
          created_at: string | null
          id: string
          input_text: string | null
          intent: string | null
          output_text: string | null
          session_id: string | null
          tools_used: Json | null
          uncertainty_score: number | null
          user_id: string | null
        }
        Insert: {
          agent_type: Database["public"]["Enums"]["agent_type"]
          context?: Json | null
          created_at?: string | null
          id?: string
          input_text?: string | null
          intent?: string | null
          output_text?: string | null
          session_id?: string | null
          tools_used?: Json | null
          uncertainty_score?: number | null
          user_id?: string | null
        }
        Update: {
          agent_type?: Database["public"]["Enums"]["agent_type"]
          context?: Json | null
          created_at?: string | null
          id?: string
          input_text?: string | null
          intent?: string | null
          output_text?: string | null
          session_id?: string | null
          tools_used?: Json | null
          uncertainty_score?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      experiments: {
        Row: {
          config: Json | null
          created_at: string | null
          created_by: string | null
          description: string | null
          end_date: string | null
          id: string
          name: string
          start_date: string | null
          status: Database["public"]["Enums"]["experiment_status"] | null
          updated_at: string | null
        }
        Insert: {
          config?: Json | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["experiment_status"] | null
          updated_at?: string | null
        }
        Update: {
          config?: Json | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["experiment_status"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      inventory_snapshots: {
        Row: {
          id: string
          location: string | null
          product_id: string
          quantity: number
          reserved_quantity: number | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          location?: string | null
          product_id: string
          quantity?: number
          reserved_quantity?: number | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          location?: string | null
          product_id?: string
          quantity?: number
          reserved_quantity?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_snapshots_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      kb_gap_candidates: {
        Row: {
          agent_log_id: string | null
          created_at: string | null
          id: string
          resolved_answer_summary: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          session_id: string | null
          status: Database["public"]["Enums"]["kb_gap_status"] | null
          user_query: string
        }
        Insert: {
          agent_log_id?: string | null
          created_at?: string | null
          id?: string
          resolved_answer_summary?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          session_id?: string | null
          status?: Database["public"]["Enums"]["kb_gap_status"] | null
          user_query: string
        }
        Update: {
          agent_log_id?: string | null
          created_at?: string | null
          id?: string
          resolved_answer_summary?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          session_id?: string | null
          status?: Database["public"]["Enums"]["kb_gap_status"] | null
          user_query?: string
        }
        Relationships: [
          {
            foreignKeyName: "kb_gap_candidates_agent_log_id_fkey"
            columns: ["agent_log_id"]
            isOneToOne: false
            referencedRelation: "agent_action_logs"
            referencedColumns: ["id"]
          },
        ]
      }
      knowledge_articles: {
        Row: {
          body: string
          category: string | null
          created_at: string | null
          created_by_user_id: string | null
          id: string
          is_published: boolean | null
          source_type: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          body: string
          category?: string | null
          created_at?: string | null
          created_by_user_id?: string | null
          id?: string
          is_published?: boolean | null
          source_type?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          body?: string
          category?: string | null
          created_at?: string | null
          created_by_user_id?: string | null
          id?: string
          is_published?: boolean | null
          source_type?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: []
      }
      metric_snapshots: {
        Row: {
          created_at: string | null
          date: string
          id: string
          meta: Json | null
          metric_type: string
          value: number
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: string
          meta?: Json | null
          metric_type: string
          value: number
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          meta?: Json | null
          metric_type?: string
          value?: number
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string | null
          discount_amount: number | null
          id: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
        }
        Insert: {
          created_at?: string | null
          discount_amount?: number | null
          id?: string
          order_id: string
          product_id: string
          quantity?: number
          unit_price: number
        }
        Update: {
          created_at?: string | null
          discount_amount?: number | null
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          billing_address: Json | null
          created_at: string | null
          currency: string | null
          id: string
          notes: string | null
          shipping_address: Json | null
          status: Database["public"]["Enums"]["order_status"] | null
          total_amount: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          billing_address?: Json | null
          created_at?: string | null
          currency?: string | null
          id?: string
          notes?: string | null
          shipping_address?: Json | null
          status?: Database["public"]["Enums"]["order_status"] | null
          total_amount?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          billing_address?: Json | null
          created_at?: string | null
          currency?: string | null
          id?: string
          notes?: string | null
          shipping_address?: Json | null
          status?: Database["public"]["Enums"]["order_status"] | null
          total_amount?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      product_reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          product_id: string
          rating: number
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          product_id: string
          rating: number
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          product_id?: string
          rating?: number
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          attributes: Json | null
          category: string | null
          created_at: string | null
          currency: string | null
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          price: number
          sub_category: string | null
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          attributes?: Json | null
          category?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          price: number
          sub_category?: string | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          attributes?: Json | null
          category?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          price?: number
          sub_category?: string | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          display_name: string | null
          email: string | null
          id: string
          locale: string | null
          phone: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id?: string
          locale?: string | null
          phone?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id?: string
          locale?: string | null
          phone?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      reward_events: {
        Row: {
          applied_at: string | null
          decision_context: Json | null
          id: string
          incentive_type: string
          incentive_value: number
          order_id: string | null
          rule_id: string | null
          user_id: string
        }
        Insert: {
          applied_at?: string | null
          decision_context?: Json | null
          id?: string
          incentive_type: string
          incentive_value: number
          order_id?: string | null
          rule_id?: string | null
          user_id: string
        }
        Update: {
          applied_at?: string | null
          decision_context?: Json | null
          id?: string
          incentive_type?: string
          incentive_value?: number
          order_id?: string | null
          rule_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reward_events_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reward_events_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "reward_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      reward_rules: {
        Row: {
          conditions: Json | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          priority: number | null
          reward: Json
          type: Database["public"]["Enums"]["reward_type"]
          updated_at: string | null
        }
        Insert: {
          conditions?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          priority?: number | null
          reward: Json
          type: Database["public"]["Enums"]["reward_type"]
          updated_at?: string | null
        }
        Update: {
          conditions?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          priority?: number | null
          reward?: Json
          type?: Database["public"]["Enums"]["reward_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
      stylist_profiles: {
        Row: {
          body_type: string | null
          budget_range: Json | null
          geo_context: string | null
          id: string
          last_updated: string | null
          preferred_brands: string[] | null
          preferred_colors: string[] | null
          size_info: Json | null
          style_preferences: Json | null
          user_id: string
        }
        Insert: {
          body_type?: string | null
          budget_range?: Json | null
          geo_context?: string | null
          id?: string
          last_updated?: string | null
          preferred_brands?: string[] | null
          preferred_colors?: string[] | null
          size_info?: Json | null
          style_preferences?: Json | null
          user_id: string
        }
        Update: {
          body_type?: string | null
          budget_range?: Json | null
          geo_context?: string | null
          id?: string
          last_updated?: string | null
          preferred_brands?: string[] | null
          preferred_colors?: string[] | null
          size_info?: Json | null
          style_preferences?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      video_assets: {
        Row: {
          created_at: string | null
          extracted_products: string[] | null
          id: string
          processed_metadata: Json | null
          source_type: string | null
          source_url: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          extracted_products?: string[] | null
          id?: string
          processed_metadata?: Json | null
          source_type?: string | null
          source_url?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          extracted_products?: string[] | null
          id?: string
          processed_metadata?: Json | null
          source_type?: string | null
          source_url?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      wardrobe_items: {
        Row: {
          category: string
          color: string | null
          created_at: string | null
          id: string
          image_url: string | null
          metadata: Json | null
          name: string
          season: string | null
          sub_category: string | null
          user_id: string
        }
        Insert: {
          category: string
          color?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          metadata?: Json | null
          name: string
          season?: string | null
          sub_category?: string | null
          user_id: string
        }
        Update: {
          category?: string
          color?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          metadata?: Json | null
          name?: string
          season?: string | null
          sub_category?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      agent_type:
        | "coordinator"
        | "stylist"
        | "video_commerce"
        | "rewards"
        | "service"
        | "verification"
      app_role: "shopper" | "ops_manager" | "admin"
      experiment_status: "draft" | "active" | "paused" | "completed"
      kb_gap_status: "new" | "pending" | "approved" | "rejected"
      order_status:
        | "draft"
        | "pending"
        | "confirmed"
        | "shipped"
        | "delivered"
        | "cancelled"
        | "returned"
      reward_type:
        | "discount_percentage"
        | "discount_fixed"
        | "free_shipping"
        | "bonus_points"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      agent_type: [
        "coordinator",
        "stylist",
        "video_commerce",
        "rewards",
        "service",
        "verification",
      ],
      app_role: ["shopper", "ops_manager", "admin"],
      experiment_status: ["draft", "active", "paused", "completed"],
      kb_gap_status: ["new", "pending", "approved", "rejected"],
      order_status: [
        "draft",
        "pending",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled",
        "returned",
      ],
      reward_type: [
        "discount_percentage",
        "discount_fixed",
        "free_shipping",
        "bonus_points",
      ],
    },
  },
} as const
