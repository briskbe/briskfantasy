CREATE TABLE IF NOT EXISTS cms_clients (
  id uuid PRIMARY KEY,
  name text NOT NULL CHECK (length(name) BETWEEN 1 AND 200),
  company text NOT NULL DEFAULT '', email text NOT NULL DEFAULT '', phone text NOT NULL DEFAULT '',
  vat_number text NOT NULL DEFAULT '', address text NOT NULL DEFAULT '', notes text NOT NULL DEFAULT '',
  status text NOT NULL CHECK (status IN ('lead','active','archived')),
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS cms_projects (
  id uuid PRIMARY KEY, client_id uuid NOT NULL REFERENCES cms_clients(id) ON DELETE RESTRICT,
  title text NOT NULL CHECK (length(title) BETWEEN 1 AND 200), description text NOT NULL DEFAULT '',
  status text NOT NULL CHECK (status IN ('planned','in_progress','review','completed','on_hold')),
  service text NOT NULL DEFAULT '', budget_cents bigint NOT NULL CHECK (budget_cents BETWEEN 0 AND 100000000000),
  start_date date, due_date date, progress integer NOT NULL CHECK (progress BETWEEN 0 AND 100),
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (start_date IS NULL OR due_date IS NULL OR due_date >= start_date)
);
CREATE INDEX IF NOT EXISTS cms_projects_client_idx ON cms_projects(client_id);
CREATE TABLE IF NOT EXISTS cms_follow_ups (
  id uuid PRIMARY KEY, client_id uuid REFERENCES cms_clients(id) ON DELETE RESTRICT,
  project_id uuid REFERENCES cms_projects(id) ON DELETE RESTRICT,
  title text NOT NULL CHECK (length(title) BETWEEN 1 AND 200), notes text NOT NULL DEFAULT '',
  due_at timestamptz NOT NULL, status text NOT NULL CHECK (status IN ('open','done')),
  priority text NOT NULL CHECK (priority IN ('low','normal','high')),
  type text NOT NULL CHECK (type IN ('task','call','email','meeting')),
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS cms_follow_ups_due_idx ON cms_follow_ups(status, due_at);
CREATE INDEX IF NOT EXISTS cms_follow_ups_client_idx ON cms_follow_ups(client_id);
CREATE INDEX IF NOT EXISTS cms_follow_ups_project_idx ON cms_follow_ups(project_id);
CREATE TABLE IF NOT EXISTS cms_quote_sequences (year integer PRIMARY KEY, value integer NOT NULL CHECK(value > 0));
CREATE TABLE IF NOT EXISTS cms_quotes (
  id uuid PRIMARY KEY, number text NOT NULL UNIQUE,
  client_id uuid NOT NULL REFERENCES cms_clients(id) ON DELETE RESTRICT,
  title text NOT NULL CHECK (length(title) BETWEEN 1 AND 200),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','shared','accepted','declined')),
  currency text NOT NULL DEFAULT 'EUR' CHECK (currency = 'EUR'),
  issue_date date NOT NULL, valid_until date NOT NULL CHECK (valid_until >= issue_date),
  introduction text NOT NULL DEFAULT '', terms text NOT NULL DEFAULT '',
  items jsonb NOT NULL CHECK (jsonb_typeof(items) = 'array' AND jsonb_array_length(items) BETWEEN 1 AND 100),
  discount_cents bigint NOT NULL CHECK (discount_cents >= 0),
  subtotal_cents bigint NOT NULL CHECK (subtotal_cents BETWEEN 0 AND 100000000000),
  vat_cents bigint NOT NULL CHECK (vat_cents >= 0),
  total_cents bigint NOT NULL CHECK (total_cents BETWEEN 0 AND 100000000000),
  client_snapshot jsonb, share_token text UNIQUE CHECK (share_token IS NULL OR share_token ~ '^[A-Za-z0-9_-]{43}$'),
  shared_at timestamptz, viewed_at timestamptz, accepted_at timestamptz, accepted_name text, accepted_email text,
  response_ip_hash text, response_consent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (discount_cents <= subtotal_cents), CHECK (total_cents = subtotal_cents - discount_cents + vat_cents),
  CHECK ((status = 'draft' AND share_token IS NULL) OR (status <> 'draft' AND share_token IS NOT NULL AND client_snapshot IS NOT NULL))
);
CREATE INDEX IF NOT EXISTS cms_quotes_client_idx ON cms_quotes(client_id);
CREATE TABLE IF NOT EXISTS cms_activity (
  id uuid PRIMARY KEY, description text NOT NULL, href text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS cms_activity_created_idx ON cms_activity(created_at DESC);
CREATE TABLE IF NOT EXISTS cms_rate_limits (
  key text PRIMARY KEY, window_start timestamptz NOT NULL DEFAULT now(), count integer NOT NULL DEFAULT 1
);
CREATE INDEX IF NOT EXISTS cms_rate_limits_window_idx ON cms_rate_limits(window_start);
