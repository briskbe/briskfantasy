-- Preserve the existing open/done values and all follow-up records.
-- Only expand the allowed statuses for won and waiting follow-ups.
ALTER TABLE cms_follow_ups
  DROP CONSTRAINT cms_follow_ups_status_check,
  ADD CONSTRAINT cms_follow_ups_status_check
    CHECK (status IN ('open', 'won', 'waiting', 'done'));
