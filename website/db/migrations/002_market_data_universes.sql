create schema if not exists market_data;

create table if not exists market_data.index_memberships (
  universe_code text not null,
  ticker text not null,
  company_name text,
  sector text,
  industry text,
  source text,
  source_url text,
  raw_payload jsonb not null
);
