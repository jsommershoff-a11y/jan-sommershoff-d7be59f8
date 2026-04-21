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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      budgets: {
        Row: {
          category: string
          created_at: string
          id: number
          month: number | null
          notes: string | null
          period: string
          planned_amount: number
          updated_at: string
          user_id: string
          year: number
        }
        Insert: {
          category: string
          created_at?: string
          id?: number
          month?: number | null
          notes?: string | null
          period?: string
          planned_amount: number
          updated_at?: string
          user_id: string
          year: number
        }
        Update: {
          category?: string
          created_at?: string
          id?: number
          month?: number | null
          notes?: string | null
          period?: string
          planned_amount?: number
          updated_at?: string
          user_id?: string
          year?: number
        }
        Relationships: []
      }
      companies: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string
          email: string | null
          employee_count: number | null
          id: number
          industry: string | null
          label: string | null
          name: string
          notes: string | null
          phone: string | null
          revenue: number | null
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          employee_count?: number | null
          id?: number
          industry?: string | null
          label?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          revenue?: number | null
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          employee_count?: number | null
          id?: number
          industry?: string | null
          label?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          revenue?: number | null
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          type: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          type: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          type?: string
        }
        Relationships: []
      }
      contacts: {
        Row: {
          address: string | null
          company: string | null
          company_id: number | null
          created_at: string
          email: string | null
          id: number
          label: string | null
          last_contacted_at: string | null
          location: string | null
          name: string
          notes: string | null
          phone: string | null
          position: string | null
          sevdesk_category: string | null
          sevdesk_nr: string | null
          source: string | null
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          address?: string | null
          company?: string | null
          company_id?: number | null
          created_at?: string
          email?: string | null
          id?: number
          label?: string | null
          last_contacted_at?: string | null
          location?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          position?: string | null
          sevdesk_category?: string | null
          sevdesk_nr?: string | null
          source?: string | null
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          address?: string | null
          company?: string | null
          company_id?: number | null
          created_at?: string
          email?: string | null
          id?: number
          label?: string | null
          last_contacted_at?: string | null
          location?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          position?: string | null
          sevdesk_category?: string | null
          sevdesk_nr?: string | null
          source?: string | null
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contacts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      deals: {
        Row: {
          category: string | null
          closed_at: string | null
          company_id: number | null
          contact_id: number | null
          created_at: string
          currency: string | null
          expected_close: string | null
          id: number
          notes: string | null
          probability: number | null
          source: string | null
          stage: string | null
          status: string
          title: string
          updated_at: string
          user_id: string
          value: number | null
        }
        Insert: {
          category?: string | null
          closed_at?: string | null
          company_id?: number | null
          contact_id?: number | null
          created_at?: string
          currency?: string | null
          expected_close?: string | null
          id?: number
          notes?: string | null
          probability?: number | null
          source?: string | null
          stage?: string | null
          status?: string
          title: string
          updated_at?: string
          user_id?: string
          value?: number | null
        }
        Update: {
          category?: string | null
          closed_at?: string | null
          company_id?: number | null
          contact_id?: number | null
          created_at?: string
          currency?: string | null
          expected_close?: string | null
          id?: number
          notes?: string | null
          probability?: number | null
          source?: string | null
          stage?: string | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "deals_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          category: string | null
          company_id: number | null
          contact_id: number | null
          created_at: string
          deal_id: number | null
          description: string | null
          file_key: string | null
          file_size: number | null
          file_url: string | null
          id: number
          mime_type: string | null
          name: string
          tags: string[] | null
          ticket_id: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string | null
          company_id?: number | null
          contact_id?: number | null
          created_at?: string
          deal_id?: number | null
          description?: string | null
          file_key?: string | null
          file_size?: number | null
          file_url?: string | null
          id?: number
          mime_type?: string | null
          name: string
          tags?: string[] | null
          ticket_id?: number | null
          updated_at?: string
          user_id?: string
        }
        Update: {
          category?: string | null
          company_id?: number | null
          contact_id?: number | null
          created_at?: string
          deal_id?: number | null
          description?: string | null
          file_key?: string | null
          file_size?: number | null
          file_url?: string | null
          id?: number
          mime_type?: string | null
          name?: string
          tags?: string[] | null
          ticket_id?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      expenses: {
        Row: {
          amount: number
          budget_id: number | null
          category: string
          created_at: string
          date: string
          description: string
          id: number
          notes: string | null
          payment_method: string | null
          receipt_url: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          budget_id?: number | null
          category: string
          created_at?: string
          date?: string
          description: string
          id?: number
          notes?: string | null
          payment_method?: string | null
          receipt_url?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          budget_id?: number | null
          category?: string
          created_at?: string
          date?: string
          description?: string
          id?: number
          notes?: string | null
          payment_method?: string | null
          receipt_url?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      interactions: {
        Row: {
          channel: string | null
          company_id: number | null
          contact_id: number | null
          content: string | null
          created_at: string
          direction: string | null
          id: number
          occurred_at: string
          status: string | null
          subject: string | null
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          channel?: string | null
          company_id?: number | null
          contact_id?: number | null
          content?: string | null
          created_at?: string
          direction?: string | null
          id?: number
          occurred_at?: string
          status?: string | null
          subject?: string | null
          type?: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          channel?: string | null
          company_id?: number | null
          contact_id?: number | null
          content?: string | null
          created_at?: string
          direction?: string | null
          id?: number
          occurred_at?: string
          status?: string | null
          subject?: string | null
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "interactions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interactions_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          amount: number
          contact_id: number | null
          created_at: string
          deal_id: number | null
          description: string | null
          direction: string | null
          due_date: string
          entity: string | null
          forwarded_at: string | null
          forwarded_to: string | null
          id: number
          invoice_number: string
          notes: string | null
          paid_at: string | null
          payment_method: string | null
          reminder_count: number | null
          reminder_sent_at: string | null
          sender_email: string | null
          sender_name: string | null
          source_email_subject: string | null
          source_mailbox: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          contact_id?: number | null
          created_at?: string
          deal_id?: number | null
          description?: string | null
          direction?: string | null
          due_date: string
          entity?: string | null
          forwarded_at?: string | null
          forwarded_to?: string | null
          id?: number
          invoice_number: string
          notes?: string | null
          paid_at?: string | null
          payment_method?: string | null
          reminder_count?: number | null
          reminder_sent_at?: string | null
          sender_email?: string | null
          sender_name?: string | null
          source_email_subject?: string | null
          source_mailbox?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          contact_id?: number | null
          created_at?: string
          deal_id?: number | null
          description?: string | null
          direction?: string | null
          due_date?: string
          entity?: string | null
          forwarded_at?: string | null
          forwarded_to?: string | null
          id?: number
          invoice_number?: string
          notes?: string | null
          paid_at?: string | null
          payment_method?: string | null
          reminder_count?: number | null
          reminder_sent_at?: string | null
          sender_email?: string | null
          sender_name?: string | null
          source_email_subject?: string | null
          source_mailbox?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      recurring_transactions: {
        Row: {
          amount: number
          auto_create: boolean
          category: string
          created_at: string
          day_of_month: number | null
          day_of_week: number | null
          description: string | null
          frequency: Database["public"]["Enums"]["recurring_frequency"]
          id: number
          invoice_number_pattern: string | null
          last_created_date: string | null
          next_due_date: string
          notes: string | null
          payment_method: string | null
          type: Database["public"]["Enums"]["recurring_transaction_type"]
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          auto_create?: boolean
          category: string
          created_at?: string
          day_of_month?: number | null
          day_of_week?: number | null
          description?: string | null
          frequency: Database["public"]["Enums"]["recurring_frequency"]
          id?: never
          invoice_number_pattern?: string | null
          last_created_date?: string | null
          next_due_date: string
          notes?: string | null
          payment_method?: string | null
          type: Database["public"]["Enums"]["recurring_transaction_type"]
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          auto_create?: boolean
          category?: string
          created_at?: string
          day_of_month?: number | null
          day_of_week?: number | null
          description?: string | null
          frequency?: Database["public"]["Enums"]["recurring_frequency"]
          id?: never
          invoice_number_pattern?: string | null
          last_created_date?: string | null
          next_due_date?: string
          notes?: string | null
          payment_method?: string | null
          type?: Database["public"]["Enums"]["recurring_transaction_type"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          due_date: string | null
          google_event_id: string | null
          id: number
          priority: string
          related_contact_id: number | null
          related_deal_id: number | null
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          google_event_id?: string | null
          id?: number
          priority?: string
          related_contact_id?: number | null
          related_deal_id?: number | null
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          google_event_id?: string | null
          id?: number
          priority?: string
          related_contact_id?: number | null
          related_deal_id?: number | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      tickets: {
        Row: {
          category: string | null
          company_id: number | null
          contact_id: number | null
          created_at: string
          deal_id: number | null
          description: string | null
          due_date: string | null
          id: number
          priority: string | null
          resolution: string | null
          resolved_at: string | null
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string | null
          company_id?: number | null
          contact_id?: number | null
          created_at?: string
          deal_id?: number | null
          description?: string | null
          due_date?: string | null
          id?: number
          priority?: string | null
          resolution?: string | null
          resolved_at?: string | null
          status?: string
          title: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          category?: string | null
          company_id?: number | null
          contact_id?: number | null
          created_at?: string
          deal_id?: number | null
          description?: string | null
          due_date?: string | null
          id?: number
          priority?: string | null
          resolution?: string | null
          resolved_at?: string | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tickets_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          category: string
          contact_id: number | null
          created_at: string
          date: string
          deal_id: number | null
          description: string | null
          id: number
          invoice_number: string | null
          notes: string | null
          payment_method: string | null
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          category: string
          contact_id?: number | null
          created_at?: string
          date: string
          deal_id?: number | null
          description?: string | null
          id?: number
          invoice_number?: string | null
          notes?: string | null
          payment_method?: string | null
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          category?: string
          contact_id?: number | null
          created_at?: string
          date?: string
          deal_id?: number | null
          description?: string | null
          id?: number
          invoice_number?: string | null
          notes?: string | null
          payment_method?: string | null
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_mappings: {
        Row: {
          created_at: string
          id: number
          mysql_id: number
          supabase_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          mysql_id: number
          supabase_id: string
        }
        Update: {
          created_at?: string
          id?: number
          mysql_id?: number
          supabase_id?: string
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
      app_role: "admin" | "moderator" | "user"
      recurring_frequency:
        | "daily"
        | "weekly"
        | "biweekly"
        | "monthly"
        | "quarterly"
        | "yearly"
      recurring_transaction_type: "income" | "expense"
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
      app_role: ["admin", "moderator", "user"],
      recurring_frequency: [
        "daily",
        "weekly",
        "biweekly",
        "monthly",
        "quarterly",
        "yearly",
      ],
      recurring_transaction_type: ["income", "expense"],
    },
  },
} as const
