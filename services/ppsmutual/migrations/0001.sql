PRAGMA foreign_keys = ON;
CREATE TABLE registrations (
 id TEXT PRIMARY KEY,
 request_key TEXT NOT NULL UNIQUE,
 payload_hash TEXT NOT NULL,
 event_id TEXT NOT NULL,
 first_name TEXT NOT NULL,
 last_name TEXT NOT NULL,
 email TEXT NOT NULL,
 organisation TEXT NOT NULL,
 phone TEXT NOT NULL DEFAULT '',
 dietary TEXT NOT NULL DEFAULT 'none',
 dietary_notes TEXT NOT NULL DEFAULT '',
 consent_at TEXT NOT NULL,
 created_at TEXT NOT NULL,
 cancelled_at TEXT,
 UNIQUE(event_id, email)
);
CREATE TABLE email_jobs (
 id TEXT PRIMARY KEY,
 registration_id TEXT NOT NULL REFERENCES registrations(id),
 kind TEXT NOT NULL,
 payload TEXT NOT NULL,
 due_at INTEGER NOT NULL,
 status TEXT NOT NULL DEFAULT 'pending',
 attempts INTEGER NOT NULL DEFAULT 0,
 first_attempt_at INTEGER,
 lease_until INTEGER,
 provider_id TEXT,
 last_error TEXT,
 UNIQUE(registration_id, kind)
);
CREATE INDEX email_due ON email_jobs(status, due_at);
CREATE TABLE rate_limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires_at INTEGER NOT NULL);
