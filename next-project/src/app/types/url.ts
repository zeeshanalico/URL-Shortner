export interface LOGO {
  logo_id: number
  logo_path: string;
}

export interface URL_TAG {
  tag_id: number;
  tag_name: string;
}

export interface URLCLICK {
  click_id: number;
  url_id: string;
  access_date: Date;
  access_time: Date;
  ip_address: string;
  user_agent: string;
  referrer?: string | null;
  country?: string | null;
  city?: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  is_deleted: boolean;
}

type Status = 'active' | 'inactive'
export type Url = {
  url_id: string;
  original_url: string;
  short_url: string;
  expiration_date: string | null;
  created_at: string;
  updated_at: string;
  status: Status,
  url_type: string;
  logo: null | LOGO;
  url_tag: null | URL_TAG;
  url_click: [] | URLCLICK[]
};

export type GenerateUrlFormState = {
  original_url: string;
  url_type: string;
  expiration_date: string;
  tag_name?: string;
  url_id?: string
};