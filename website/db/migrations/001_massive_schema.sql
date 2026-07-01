create schema if not exists massive;

create table if not exists massive.exchanges (
  id integer primary key,
  acronym text,
  asset_class text,
  locale text,
  mic text,
  name text,
  operating_mic text,
  participant_id text,
  type text,
  url text,
  raw_payload jsonb not null
);

create table if not exists massive.market_holidays (
  date date,
  exchange text,
  name text,
  status text,
  open text,
  close text,
  raw_payload jsonb not null
);

create table if not exists massive.market_status (
  observed_at timestamptz not null default now(),
  server_time timestamptz,
  market text,
  early_hours boolean,
  after_hours boolean,
  exchanges jsonb,
  currencies jsonb,
  indices_groups jsonb,
  raw_payload jsonb not null
);

create table if not exists massive.condition_codes (
  id integer not null,
  abbreviation text,
  asset_class text,
  data_types jsonb,
  description text,
  exchange integer,
  legacy boolean,
  name text,
  sip_mapping jsonb,
  type text,
  update_rules jsonb,
  raw_payload jsonb not null
);
create table if not exists massive.tickers (
  ticker text,
  name text,
  market text,
  locale text,
  primary_exchange text,
  type text,
  active boolean,
  currency_name text,
  currency_symbol text,
  base_currency_name text,
  base_currency_symbol text,
  cik text,
  composite_figi text,
  share_class_figi text,
  last_updated_utc timestamptz,
  delisted_utc timestamptz,
  raw_payload jsonb not null
);
create table if not exists massive.ticker_overviews (
  ticker text,
  query_date date,
  active boolean,
  address jsonb,
  branding jsonb,
  cik text,
  composite_figi text,
  currency_name text,
  delisted_utc timestamptz,
  description text,
  homepage_url text,
  list_date date,
  locale text,
  market text,
  market_cap numeric,
  name text,
  phone_number text,
  primary_exchange text,
  round_lot numeric,
  share_class_figi text,
  share_class_shares_outstanding numeric,
  sic_code text,
  sic_description text,
  ticker_root text,
  ticker_suffix text,
  total_employees numeric,
  type text,
  weighted_shares_outstanding numeric,
  raw_payload jsonb not null
);

create table if not exists massive.ticker_types (
  asset_class text,
  code text,
  description text,
  locale text,
  raw_payload jsonb not null
);

create table if not exists massive.related_tickers (
  ticker text,
  related_ticker text,
  raw_payload jsonb not null
);
create table if not exists massive.daily_market_summaries (
  trading_date date not null,
  ticker text,
  adjusted boolean,
  include_otc boolean,
  volume numeric,
  volume_weighted_average_price numeric,
  open numeric,
  close numeric,
  high numeric,
  low numeric,
  window_start timestamptz,
  transactions integer,
  raw_payload jsonb not null
);
create table if not exists massive.aggregate_bars_4h (
  ticker text not null,
  adjusted boolean not null,
  multiplier integer not null,
  timespan text not null,
  request_from date not null,
  request_to date not null,
  window_start timestamptz not null,
  open numeric,
  high numeric,
  low numeric,
  close numeric,
  volume numeric,
  volume_weighted_average_price numeric,
  transactions integer,
  otc boolean,
  raw_payload jsonb not null,
  primary key (ticker, window_start, adjusted)
);

create table if not exists massive.aggregate_bars_15m (
  ticker text not null,
  adjusted boolean not null,
  multiplier integer not null,
  timespan text not null,
  request_from date not null,
  request_to date not null,
  window_start timestamptz not null,
  open numeric,
  high numeric,
  low numeric,
  close numeric,
  volume numeric,
  volume_weighted_average_price numeric,
  transactions integer,
  otc boolean,
  raw_payload jsonb not null,
  primary key (ticker, window_start, adjusted)
);

create index if not exists aggregate_bars_4h_window_start_idx
  on massive.aggregate_bars_4h (window_start);

create index if not exists aggregate_bars_15m_window_start_idx
  on massive.aggregate_bars_15m (window_start);
create table if not exists massive.splits (
  id text,
  ticker text,
  execution_date date,
  adjustment_type text,
  split_from numeric,
  split_to numeric,
  historical_adjustment_factor numeric,
  raw_payload jsonb not null
);

create index if not exists splits_ticker_execution_date_idx
  on massive.splits (ticker, execution_date);

create index if not exists splits_execution_date_idx
  on massive.splits (execution_date);

create table if not exists massive.balance_sheets (
  cik text,
  tickers text[],
  primary_ticker text,
  period_end date,
  filing_date date,
  fiscal_year integer,
  fiscal_quarter integer,
  timeframe text,
  raw_payload jsonb not null
);

create table if not exists massive.cash_flow_statements (
  cik text,
  tickers text[],
  primary_ticker text,
  period_end date,
  filing_date date,
  fiscal_year integer,
  fiscal_quarter integer,
  timeframe text,
  raw_payload jsonb not null
);

create table if not exists massive.income_statements (
  cik text,
  tickers text[],
  primary_ticker text,
  period_end date,
  filing_date date,
  fiscal_year integer,
  fiscal_quarter integer,
  timeframe text,
  raw_payload jsonb not null
);

create table if not exists massive.financial_ratios (
  cik text,
  tickers text[],
  primary_ticker text,
  period_end date,
  filing_date date,
  fiscal_year integer,
  fiscal_quarter integer,
  timeframe text,
  raw_payload jsonb not null
);

create table if not exists massive.short_interest (
  ticker text,
  settlement_date date,
  short_interest numeric,
  avg_daily_volume numeric,
  days_to_cover numeric,
  raw_payload jsonb not null
);

create table if not exists massive.short_volume (
  ticker text,
  trading_date date,
  short_volume numeric,
  short_exempt_volume numeric,
  total_volume numeric,
  raw_payload jsonb not null
);

create table if not exists massive.float (
  ticker text,
  float_date date,
  free_float numeric,
  free_float_percent numeric,
  shares_outstanding numeric,
  raw_payload jsonb not null
);



create table if not exists massive.ipos (
  ticker text,
  ipo_date date,
  listing_date date,
  issuer_name text,
  issue_name text,
  security_type text,
  final_issue_price numeric,
  shares_offered numeric,
  total_offer_size numeric,
  raw_payload jsonb not null
);

create table if not exists massive.dividends (
  id text,
  ticker text,
  cash_amount numeric,
  currency text,
  declaration_date date,
  dividend_type text,
  ex_dividend_date date,
  frequency integer,
  pay_date date,
  record_date date,
  raw_payload jsonb not null
);

create table if not exists massive.ticker_events (
  ticker text,
  event_id text,
  event_type text,
  event_date date,
  name text,
  raw_payload jsonb not null
);

alter table massive.dividends
  add column if not exists distribution_type text;

create table if not exists massive.trades (
  ticker text not null,
  conditions integer[],
  correction integer,
  exchange integer,
  trade_id text,
  participant_timestamp timestamptz,
  price numeric,
  sequence_number bigint,
  sip_timestamp timestamptz not null,
  size numeric,
  tape integer,
  trf_id integer,
  trf_timestamp timestamptz,
  raw_payload jsonb not null,
  primary key (ticker, sip_timestamp, sequence_number, trade_id)
);

create index if not exists trades_ticker_sip_timestamp_idx
  on massive.trades (ticker, sip_timestamp);


alter table massive.exchanges
  drop column if exists first_seen_at,
  drop column if exists last_seen_at;

alter table massive.market_holidays
  drop column if exists first_seen_at,
  drop column if exists last_seen_at;

alter table massive.condition_codes
  drop column if exists first_seen_at,
  drop column if exists last_seen_at;


create unique index if not exists market_holidays_date_exchange_name_uidx
  on massive.market_holidays (
    coalesce(date, '0001-01-01'::date),
    coalesce(exchange, ''),
    coalesce(name, '')
  );

create unique index if not exists condition_codes_context_uidx
  on massive.condition_codes (
    id,
    coalesce(asset_class, ''),
    coalesce(type, ''),
    coalesce(name, '')
  );

create index if not exists market_status_observed_at_idx
  on massive.market_status (observed_at desc);

with ranked_related_tickers as (
  select
    ctid,
    row_number() over (
      partition by coalesce(ticker, ''), coalesce(related_ticker, '')
      order by ctid
    ) as row_number
  from massive.related_tickers
)
delete from massive.related_tickers related_tickers
using ranked_related_tickers ranked
where related_tickers.ctid = ranked.ctid
  and ranked.row_number > 1;

create unique index if not exists tickers_market_locale_ticker_uidx
  on massive.tickers (
    coalesce(market, ''),
    coalesce(locale, ''),
    coalesce(ticker, '')
  );

create unique index if not exists ticker_types_asset_locale_code_uidx
  on massive.ticker_types (
    coalesce(asset_class, ''),
    coalesce(locale, ''),
    coalesce(code, '')
  );

create unique index if not exists ticker_overviews_ticker_query_date_uidx
  on massive.ticker_overviews (
    coalesce(ticker, ''),
    coalesce(query_date, '0001-01-01'::date)
  );

create unique index if not exists related_tickers_pair_uidx
  on massive.related_tickers (
    coalesce(ticker, ''),
    coalesce(related_ticker, '')
  );

create unique index if not exists daily_market_summaries_date_ticker_adjusted_otc_uidx
  on massive.daily_market_summaries (
    trading_date,
    coalesce(ticker, ''),
    coalesce(adjusted, false),
    coalesce(include_otc, false)
  );

create table if not exists massive.aggregate_bars_1d (
  ticker text not null,
  adjusted boolean not null,
  multiplier integer not null,
  timespan text not null,
  request_from date not null,
  request_to date not null,
  window_start timestamptz not null,
  open numeric,
  high numeric,
  low numeric,
  close numeric,
  volume numeric,
  volume_weighted_average_price numeric,
  transactions integer,
  otc boolean,
  raw_payload jsonb not null,
  primary key (ticker, window_start, adjusted)
);

create index if not exists aggregate_bars_1d_window_start_idx
  on massive.aggregate_bars_1d (window_start);
