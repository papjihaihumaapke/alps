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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          color: string | null
          currency: string
          id: string
          name: string
          order_id: string
          product_slug: string | null
          qty: number
          size: string | null
          unit_price: number
        }
        Insert: {
          color?: string | null
          currency: string
          id?: string
          name: string
          order_id: string
          product_slug?: string | null
          qty?: number
          size?: string | null
          unit_price?: number
        }
        Update: {
          color?: string | null
          currency?: string
          id?: string
          name?: string
          order_id?: string
          product_slug?: string | null
          qty?: number
          size?: string | null
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
        ]
      }
      orders: {
        Row: {
          address: string | null
          country: string | null
          created_at: string
          currency: string
          discount: number
          email: string
          full_name: string
          id: string
          mobile: string | null
          order_number: string
          promo_code: string | null
          shipping: number
          status: string
          subtotal: number
          tax: number
          total: number
          user_id: string | null
        }
        Insert: {
          address?: string | null
          country?: string | null
          created_at?: string
          currency: string
          discount?: number
          email: string
          full_name: string
          id?: string
          mobile?: string | null
          order_number?: string
          promo_code?: string | null
          shipping?: number
          status?: string
          subtotal?: number
          tax?: number
          total?: number
          user_id?: string | null
        }
        Update: {
          address?: string | null
          country?: string | null
          created_at?: string
          currency?: string
          discount?: number
          email?: string
          full_name?: string
          id?: string
          mobile?: string | null
          order_number?: string
          promo_code?: string | null
          shipping?: number
          status?: string
          subtotal?: number
          tax?: number
          total?: number
          user_id?: string | null
        }
        Relationships: []
      }
      preorders: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          mobile: string | null
          notified: boolean
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          mobile?: string | null
          notified?: boolean
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          mobile?: string | null
          notified?: boolean
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string
          colors: string[]
          created_at: string
          description: string | null
          features: string[]
          hidden: boolean
          id: string
          image_url: string | null
          name: string
          price_cad: number
          price_hkd: number
          sizes: string[]
          slug: string
          stock: number
          tags: string[]
          updated_at: string
        }
        Insert: {
          category: string
          colors?: string[]
          created_at?: string
          description?: string | null
          features?: string[]
          hidden?: boolean
          id?: string
          image_url?: string | null
          name: string
          price_cad?: number
          price_hkd?: number
          sizes?: string[]
          slug: string
          stock?: number
          tags?: string[]
          updated_at?: string
        }
        Update: {
          category?: string
          colors?: string[]
          created_at?: string
          description?: string | null
          features?: string[]
          hidden?: boolean
          id?: string
          image_url?: string | null
          name?: string
          price_cad?: number
          price_hkd?: number
          sizes?: string[]
          slug?: string
          stock?: number
          tags?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          mobile: string | null
          newsletter_opt_in: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          mobile?: string | null
          newsletter_opt_in?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          mobile?: string | null
          newsletter_opt_in?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      promo_codes: {
        Row: {
          active: boolean
          amount: number
          applicable_products: string[] | null
          code: string
          created_at: string
          currency: string | null
          discount_type: string
          expires_at: string | null
          id: string
          usage_limit: number | null
          used_count: number
        }
        Insert: {
          active?: boolean
          amount: number
          applicable_products?: string[] | null
          code: string
          created_at?: string
          currency?: string | null
          discount_type: string
          expires_at?: string | null
          id?: string
          usage_limit?: number | null
          used_count?: number
        }
        Update: {
          active?: boolean
          amount?: number
          applicable_products?: string[] | null
          code?: string
          created_at?: string
          currency?: string | null
          discount_type?: string
          expires_at?: string | null
          id?: string
          usage_limit?: number | null
          used_count?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
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
      app_role: "admin" | "user"
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
      app_role: ["admin", "user"],
    },
  },
} as const
