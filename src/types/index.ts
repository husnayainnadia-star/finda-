export type ItemCategory =
  | 'dompet'
  | 'tas'
  | 'elektronik'
  | 'dokumen'
  | 'kunci'
  | 'perhiasan'
  | 'pakaian'
  | 'buku'
  | 'lainnya';

export type ReportStatus = 'active' | 'found' | 'closed';
export type ReportType = 'lost' | 'found';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string;
  created_at: string;
}

export interface LostReport {
  id: string;
  user_id: string;
  item_name: string;
  description: string;
  category: ItemCategory;
  last_seen_location: string;
  lost_date?: string;
  image_url?: string;
  status: ReportStatus;
  created_at: string;
  profiles?: Profile;
}

export interface FoundReport {
  id: string;
  user_id: string;
  item_name: string;
  description: string;
  category: ItemCategory;
  found_location: string;
  found_date?: string;
  contact_information: string;
  image_url?: string;
  status: ReportStatus;
  created_at: string;
  profiles?: Profile;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  notification_type: 'match' | 'contact' | 'status_change' | 'system';
  related_report_id?: string;
  is_read: boolean;
  created_at: string;
}

export interface Match {
  id: string;
  lost_report_id: string;
  found_report_id: string;
  match_score: number;
  match_status: 'pending' | 'confirmed' | 'rejected';
  created_at: string;
}

export interface SearchFilters {
  query: string;
  category?: ItemCategory | '';
  location?: string;
  date?: string;
  type?: ReportType | 'all';
}
