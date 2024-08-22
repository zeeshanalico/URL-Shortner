--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: STATUS; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."STATUS" AS ENUM (
    'active',
    'inactive'
);


ALTER TYPE public."STATUS" OWNER TO postgres;

--
-- Name: URLTYPE; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."URLTYPE" AS ENUM (
    'store',
    'product',
    'misc'
);


ALTER TYPE public."URLTYPE" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: api_key; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.api_key (
    api_key_id integer NOT NULL,
    user_id uuid NOT NULL,
    api_key character varying(255) NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    expires_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(6) without time zone,
    is_deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.api_key OWNER TO postgres;

--
-- Name: api_key_api_key_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.api_key_api_key_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.api_key_api_key_id_seq OWNER TO postgres;

--
-- Name: api_key_api_key_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.api_key_api_key_id_seq OWNED BY public.api_key.api_key_id;


--
-- Name: audit_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.audit_log (
    audit_id integer NOT NULL,
    url_id uuid NOT NULL,
    action character varying(50) NOT NULL,
    changed_by uuid NOT NULL,
    change_date timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    details text,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(6) without time zone,
    is_deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.audit_log OWNER TO postgres;

--
-- Name: audit_log_audit_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.audit_log_audit_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.audit_log_audit_id_seq OWNER TO postgres;

--
-- Name: audit_log_audit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.audit_log_audit_id_seq OWNED BY public.audit_log.audit_id;


--
-- Name: logo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.logo (
    logo_id integer NOT NULL,
    user_id uuid NOT NULL,
    logo_path character varying(255) NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone,
    deleted_at timestamp(6) without time zone,
    is_deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.logo OWNER TO postgres;

--
-- Name: logo_logo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.logo_logo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.logo_logo_id_seq OWNER TO postgres;

--
-- Name: logo_logo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.logo_logo_id_seq OWNED BY public.logo.logo_id;


--
-- Name: url; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.url (
    url_id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    original_url text,
    short_url character varying(20) NOT NULL,
    logo_id integer,
    tag_id integer,
    associated boolean DEFAULT false NOT NULL,
    expiration_date date,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(6) without time zone,
    is_deleted boolean DEFAULT false NOT NULL,
    is_pre_generated boolean DEFAULT false NOT NULL,
    associated_at timestamp(6) without time zone,
    url_type public."URLTYPE" NOT NULL,
    status public."STATUS" DEFAULT 'active'::public."STATUS" NOT NULL
);


ALTER TABLE public.url OWNER TO postgres;

--
-- Name: url_click; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.url_click (
    click_id integer NOT NULL,
    url_id uuid NOT NULL,
    access_date date NOT NULL,
    access_time time(6) without time zone NOT NULL,
    ip_address character varying(45) NOT NULL,
    user_agent text NOT NULL,
    referrer text,
    country character varying(50),
    city character varying(50),
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(6) without time zone,
    is_deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.url_click OWNER TO postgres;

--
-- Name: url_click_click_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.url_click_click_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.url_click_click_id_seq OWNER TO postgres;

--
-- Name: url_click_click_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.url_click_click_id_seq OWNED BY public.url_click.click_id;


--
-- Name: url_tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.url_tag (
    tag_id integer NOT NULL,
    user_id uuid NOT NULL,
    tag_name character varying(50) NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(6) without time zone,
    is_deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.url_tag OWNER TO postgres;

--
-- Name: url_tag_tag_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.url_tag_tag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.url_tag_tag_id_seq OWNER TO postgres;

--
-- Name: url_tag_tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.url_tag_tag_id_seq OWNED BY public.url_tag.tag_id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    user_id uuid DEFAULT gen_random_uuid() NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password_hash character varying(255) NOT NULL,
    role_id integer,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(6) without time zone,
    is_deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_role (
    role_id integer NOT NULL,
    role_name character varying(50) NOT NULL,
    description text,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp(6) without time zone,
    is_deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.user_role OWNER TO postgres;

--
-- Name: user_role_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_role_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_role_role_id_seq OWNER TO postgres;

--
-- Name: user_role_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_role_role_id_seq OWNED BY public.user_role.role_id;


--
-- Name: api_key api_key_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.api_key ALTER COLUMN api_key_id SET DEFAULT nextval('public.api_key_api_key_id_seq'::regclass);


--
-- Name: audit_log audit_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_log ALTER COLUMN audit_id SET DEFAULT nextval('public.audit_log_audit_id_seq'::regclass);


--
-- Name: logo logo_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logo ALTER COLUMN logo_id SET DEFAULT nextval('public.logo_logo_id_seq'::regclass);


--
-- Name: url_click click_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.url_click ALTER COLUMN click_id SET DEFAULT nextval('public.url_click_click_id_seq'::regclass);


--
-- Name: url_tag tag_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.url_tag ALTER COLUMN tag_id SET DEFAULT nextval('public.url_tag_tag_id_seq'::regclass);


--
-- Name: user_role role_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_role ALTER COLUMN role_id SET DEFAULT nextval('public.user_role_role_id_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
b3d63052-46ca-43d0-9e70-3527b1b4bdf2	4ce4db75b2114aacb9335bbd54fc2367ee37a08b817e8f54ece3616c0775a8aa	2024-07-30 14:51:55.097544+05	20240729141347_first_migration	\N	\N	2024-07-30 14:51:54.897194+05	1
7e943ba4-696d-43a3-87c7-712345c56b03	bf5e0cf5a4ec5769ec262e38fd6743cb6ea5fb2a8c32b1ecfcb676b4d2c0b35f	2024-07-30 14:53:36.552792+05	20240730095209_string_changed_to_enum	\N	\N	2024-07-30 14:53:36.538484+05	1
\.


--
-- Data for Name: api_key; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.api_key (api_key_id, user_id, api_key, created_at, expires_at, updated_at, deleted_at, is_deleted) FROM stdin;
17	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	7337a18eb94b47dd56d14c1fa96adbd5f4275dd53352903fef002935d91ad31d	2024-08-19 11:15:46.437	2024-09-05 00:00:00	2024-08-19 11:15:46.437	\N	f
\.


--
-- Data for Name: audit_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.audit_log (audit_id, url_id, action, changed_by, change_date, details, created_at, updated_at, deleted_at, is_deleted) FROM stdin;
\.


--
-- Data for Name: logo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.logo (logo_id, user_id, logo_path, created_at, updated_at, deleted_at, is_deleted) FROM stdin;
5	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	D:\\UC - WorkSpace\\Projects\\nest-project\\src\\uploads\\logos\\4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d\\Screenshot (1).png.png	2024-08-15 06:41:01.533	\N	\N	f
6	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	D:\\UC - WorkSpace\\Projects\\nest-project\\src\\uploads\\logos\\4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d\\Screenshot (2).png.png	2024-08-15 06:41:01.533	\N	\N	f
7	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	D:\\UC - WorkSpace\\Projects\\nest-project\\src\\uploads\\logos\\4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d\\Screenshot (3).png.png	2024-08-15 06:41:01.533	\N	\N	f
8	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	D:\\UC - WorkSpace\\Projects\\nest-project\\src\\uploads\\logos\\4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d\\Screenshot (1).png.png	2024-08-15 06:44:29.381	\N	\N	f
9	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	D:\\UC - WorkSpace\\Projects\\nest-project\\src\\uploads\\logos\\4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d\\Screenshot (2).png.png	2024-08-15 06:44:29.381	\N	\N	f
10	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	D:\\UC - WorkSpace\\Projects\\nest-project\\src\\uploads\\logos\\4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d\\Screenshot (3).png.png	2024-08-15 06:44:29.381	\N	\N	f
11	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	D:\\UC - WorkSpace\\Projects\\nest-project\\src\\uploads\\logos\\4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d\\Screenshot (6).png.png	2024-08-15 14:08:16.574	\N	\N	f
12	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	D:\\UC - WorkSpace\\Projects\\nest-project\\src\\uploads\\logos\\4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d\\Screenshot (41).png.png	2024-08-18 13:45:01.372	\N	\N	f
\.


--
-- Data for Name: url; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.url (url_id, user_id, original_url, short_url, logo_id, tag_id, associated, expiration_date, created_at, updated_at, deleted_at, is_deleted, is_pre_generated, associated_at, url_type, status) FROM stdin;
dc521869-2207-49e7-ad0b-462cdcbc84c6	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	http://www.google.com	a6224a24812df1	\N	2	f	2024-08-29	2024-08-16 21:30:06.927	2024-08-16 21:30:06.927	\N	f	f	\N	store	active
92cb8ef8-1fd3-4b78-a488-b9c10fe2b0e9	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	\N	d9d443d1b23b09	\N	\N	f	\N	2024-08-18 15:28:48.514	2024-08-18 15:28:48.514	\N	f	t	\N	product	active
da9d2b04-d2eb-4844-8091-d44374f513bd	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	\N	31321c24a77759	\N	\N	f	\N	2024-08-18 15:30:31.77	2024-08-18 15:30:31.77	\N	f	t	\N	store	active
26de99a5-632b-486b-984c-78a17c6987e1	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	http://www.facebook.com	fb31923a67f18b	\N	\N	f	2024-04-04	2024-08-11 12:28:54.077	2024-08-11 13:50:30.287	\N	t	f	\N	product	active
f4a15c25-288a-49de-a9fa-cd5d692663c7	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	http://www.facebook.com	df8db587123203	\N	\N	f	2024-09-06	2024-08-13 06:43:01.11	2024-08-17 19:07:30.006	\N	f	f	\N	product	inactive
fdadcb9f-223c-47f4-9731-9e24a5c73ce7	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	http://sdf	dfe526b1d2af7f	\N	\N	f	2024-08-08	2024-08-11 13:34:37.667	2024-08-11 13:34:37.667	\N	t	f	\N	store	active
960c6862-c027-4ee1-b590-ea0577723588	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	http://www.google.com	ce25c64e8e0f00	\N	\N	f	2024-08-11	2024-08-11 13:30:57.462	2024-08-11 13:39:56.346	\N	t	f	\N	store	active
b0166501-15e7-4eaa-a627-af26948c40b4	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	http://www.google.com	0858fc2ce5aca6	\N	\N	f	2024-08-08	2024-08-11 13:50:50.231	2024-08-11 13:50:50.231	\N	t	f	\N	product	active
db95e3a5-e7a6-44ab-a4e6-f1df566f6e7b	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	http://www.google.com	5a1001c8f29d39	\N	\N	f	2024-08-08	2024-08-11 13:50:55.585	2024-08-11 13:50:55.585	\N	t	f	\N	product	active
8036078f-6458-4221-9aa9-583394e091df	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	http://www.google.com	0354139c095b57	\N	\N	f	2024-08-13	2024-08-11 14:59:45.096	2024-08-11 14:59:45.096	\N	t	f	\N	product	active
787ef0b0-df42-4f99-abdb-ade22574515f	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	http://www.google.com	cd3ded738bef11	\N	\N	f	2024-08-20	2024-08-11 13:55:43.647	2024-08-11 15:00:48.366	\N	t	f	\N	misc	active
03e0948a-a956-4af2-8b15-6278434ed419	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	http://www.google.com	c870b96ab967f6	\N	\N	f	2024-08-16	2024-08-11 13:39:22.917	2024-08-11 15:35:25.8	\N	t	f	\N	misc	active
cfbf2e40-72a1-488b-beed-c294667f1a86	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	http://www.hello.com	f99643ead1c2c9	\N	\N	f	2024-08-24	2024-08-12 07:47:10.044	2024-08-12 07:47:10.044	\N	f	f	\N	product	active
cef0fe64-2e7b-4073-bbd1-dc202b24ef3a	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	http://www.facebook.com	64f0bc7eabf59d	\N	\N	f	2024-08-28	2024-08-12 07:51:49.444	2024-08-12 07:51:49.444	\N	f	f	\N	store	active
7f52aaef-7fd0-4b1e-b673-83f928b1637e	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	http://www.google.com	3c429e2040a050	\N	\N	f	2024-08-30	2024-08-12 07:35:48.91	2024-08-12 07:35:48.91	\N	t	f	\N	product	active
ed8f0fff-5fd1-47a8-9108-2b1f4954d46b	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	http://www.google.com	f5589573d32e0d	\N	\N	f	2024-08-30	2024-08-12 07:36:10.486	2024-08-12 07:36:10.486	\N	t	f	\N	product	active
c5f9e29b-0c09-472b-80a7-8ec808c6015f	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	http://www.facebook.com	fc5e5e408cb758	\N	\N	f	2024-08-31	2024-08-12 07:36:42.984	2024-08-12 07:36:42.984	\N	t	f	\N	product	active
308b982f-6de9-414c-836a-f48da6255591	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	http://www.facebook.com	da2bef4ab3908f	\N	\N	f	2024-08-31	2024-08-12 07:39:57.957	2024-08-12 07:39:57.957	\N	t	f	\N	product	active
1b6e81d7-a28d-4a1d-ad8b-c2eff1834a12	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	http://www.facebook.com	cbebf388419b4d	\N	\N	f	2024-08-31	2024-08-12 07:41:20.953	2024-08-12 07:41:20.953	\N	t	f	\N	product	active
2f0e84e8-49be-4310-be5e-e8d86dc5e3ff	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	\N	de426f11965c33	\N	\N	f	\N	2024-08-15 08:24:22.241	2024-08-15 08:24:22.241	\N	t	f	\N	store	active
7fe5a314-6205-4677-8f90-35b1da764c12	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	\N	4973a736186447	\N	\N	f	\N	2024-08-15 08:27:43.314	2024-08-15 08:27:43.314	\N	t	f	\N	store	active
6c2850cd-9977-43c9-a592-3ce992b655ee	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	\N	0fa02b34f5a203	\N	\N	f	\N	2024-08-15 09:53:30.121	2024-08-15 09:53:30.121	\N	t	f	\N	store	active
32636236-bbc8-412a-87f1-c331ea20b694	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	\N	c302607cd6a2e0	\N	\N	f	\N	2024-08-15 09:53:36.925	2024-08-15 09:53:36.925	\N	t	f	\N	store	active
36702cae-a5f9-42bf-bc22-742b55a72c6d	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	\N	b462a8617a74fd	\N	\N	f	\N	2024-08-15 09:53:38.669	2024-08-15 09:53:38.669	\N	t	f	\N	store	active
703b51ee-61cd-42d3-a06f-d4ec62eb0d66	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	http://www.facebook.com	96d61e313a10c1	\N	2	f	2024-08-21	2024-08-15 11:37:48.098	2024-08-15 11:37:48.098	\N	f	f	\N	product	active
3db2dcbd-3593-4b07-90be-c03f4a0f6b96	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	http://www.facebooksdfs.com	f11ba058ef22d7	\N	3	f	2024-08-29	2024-08-13 07:59:23.065	2024-08-17 19:08:14.235	\N	f	f	\N	store	inactive
57e254b3-3e48-4bfe-8c57-d62fa3127e6e	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	http://www.facebooksdfs.com	bd2055983f53ae	\N	\N	f	2024-09-06	2024-08-13 07:59:47.061	2024-08-17 19:08:29.069	\N	f	f	\N	misc	inactive
bebba164-1ed9-4843-8434-e1dbca5efbfd	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	http://www.facebooksdfs.com	5e15cff40166a1	\N	4	f	2024-09-06	2024-08-13 07:59:32.447	2024-08-17 19:08:41.957	\N	f	f	\N	store	active
fc1da379-058a-421c-b84a-2f67d394e303	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	http://www.helloworld.com	8b9aeb0e07440b	\N	2	f	2024-08-31	2024-08-17 19:14:13.851	2024-08-17 19:14:13.851	\N	f	f	\N	product	active
36d8bf97-a56d-4b2c-9dcb-0205bda6d667	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	http://www.google.com	52a2a6d65a21cb	\N	2	f	2024-09-07	2024-08-17 19:22:39.54	2024-08-17 19:22:39.54	\N	f	f	\N	product	active
d51a2160-61dc-467b-b020-837fe335baba	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	\N	25a44ba0431ac8	\N	\N	f	\N	2024-08-17 20:52:14.379	2024-08-17 20:52:14.379	\N	f	t	\N	store	active
1ef5034e-7b33-4c09-930a-153ac9f104e3	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	\N	5b3a88a939484b	\N	\N	f	\N	2024-08-17 20:53:35.046	2024-08-17 20:53:35.046	\N	f	t	\N	product	active
113447fc-1251-415b-8db2-0a3339aae413	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	\N	2b1788bdd59fa3	\N	\N	f	\N	2024-08-17 20:59:50.992	2024-08-17 20:59:50.992	\N	f	t	\N	product	active
68f5568c-e467-401d-a285-9932c2850073	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	\N	0a7cd0d3863eaa	\N	\N	f	\N	2024-08-18 12:04:58.283	2024-08-18 12:04:58.283	\N	f	t	\N	product	active
4c580c17-7a91-431d-b0c8-31f205a67d2b	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	\N	76bf14f5e2f7a1	\N	\N	f	\N	2024-08-18 12:05:53.849	2024-08-18 12:05:53.849	\N	f	t	\N	product	active
4e7e8402-64d0-4d3a-8ae8-e0856261777f	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	\N	ceee13f16ea0a7	\N	\N	f	\N	2024-08-18 12:06:38.946	2024-08-18 12:06:38.946	\N	f	t	\N	product	active
4bd0ca2e-595e-4edb-835a-0a9454f67ba7	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	\N	03638babbb882c	\N	\N	f	\N	2024-08-18 12:15:46.685	2024-08-18 12:15:46.685	\N	f	t	\N	product	active
c980fb75-1868-49cc-94b4-67498c249fa1	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	http://www.facebook.com	98d61c2d145830	\N	2	f	2024-09-07	2024-08-18 12:16:46.154	2024-08-18 12:16:46.154	\N	f	f	\N	product	active
d9473211-4853-4097-8fdb-6fecd768f249	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	\N	8c43eca1eda2bc	\N	\N	f	\N	2024-08-18 14:24:55.628	2024-08-18 14:24:55.628	\N	f	t	\N	misc	active
26480014-d903-4455-9766-9883ecf38ce4	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	http://www.google	1dda6b28f6887f	\N	2	f	2024-08-28	2024-08-13 06:42:20.377	2024-08-18 14:44:39.63	\N	f	f	\N	misc	inactive
cd2530f6-4c7d-45cd-b4c9-42efa5625b0e	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	\N	a9a15864769b3f	\N	\N	f	\N	2024-08-18 15:27:57.04	2024-08-18 15:27:57.04	\N	f	t	\N	product	active
98b2dc1e-2b09-4f87-aa53-cfdadd0eea9f	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	\N	4f24ab35c8ca8d	\N	\N	f	\N	2024-08-18 15:28:23.014	2024-08-18 15:28:23.014	\N	f	t	\N	product	active
c54dad7a-ebed-4f26-b114-2502e8e8e19f	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	\N	6136c6c13ef63d	\N	\N	f	\N	2024-08-18 15:34:43.799	2024-08-18 15:34:43.799	\N	f	t	\N	product	active
939f18e9-3f13-48db-a3cd-c1d1b5e4e1ed	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	\N	dc1ef570c406b7	\N	\N	f	\N	2024-08-18 15:34:46.006	2024-08-18 15:34:46.006	\N	f	t	\N	product	active
a978555c-0440-4d1d-9c4d-b1aa0f0e1c79	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	\N	1d37feb905d9f4	\N	\N	f	\N	2024-08-18 15:34:49.118	2024-08-18 15:34:49.118	\N	f	t	\N	misc	active
ccaea8fe-f845-4064-b15e-c6296307efa4	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	\N	f3d0c13a5c34ee	\N	\N	f	\N	2024-08-18 15:45:54.581	2024-08-18 15:45:54.581	\N	f	t	\N	store	active
c55fe76d-6d3c-452c-92c6-3e13d6740327	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	\N	7cd4a75b73ccae	\N	\N	f	\N	2024-08-18 15:46:13.037	2024-08-18 15:46:13.037	\N	f	t	\N	product	active
e0f68249-413f-4c17-aae4-d0c9f9ad322c	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	http://www.google.com	ca1f923b0353d7	\N	3	f	2024-08-28	2024-08-18 15:34:09.675	2024-08-18 17:29:49.878	\N	f	f	\N	product	active
8489b37c-3f2c-4e03-b392-ea307b0618a6	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	http://www.facebook.com	8e435eaf9fd726	\N	6	f	2024-09-07	2024-08-18 17:33:14.894	2024-08-18 17:33:14.894	\N	f	f	\N	product	active
8ab15b75-b9d9-46a2-8e0c-123cec983b3f	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	http://www.techbazaar.pk	6817959eecdc8a	\N	2	f	2024-09-07	2024-08-20 10:39:17.977	2024-08-20 10:39:17.977	\N	f	f	\N	product	active
8be494c7-83ce-4878-9f91-0c3de944f250	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	http://www.facebook.com	a5e537d9a40a61	\N	6	f	2024-09-06	2024-08-17 21:35:07.048	2024-08-18 17:34:47.203	\N	f	f	\N	product	active
0625b751-862a-4a3b-9f7c-28d6d6560a66	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	http://www.google.com	63f137a96bbe8b	\N	3	f	2024-08-29	2024-08-18 15:34:23.24	2024-08-18 17:32:52.387	\N	t	f	\N	product	active
f8a53093-0080-47a5-b8a4-5bb30157d41d	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	http://www.facebook.com	3e464de9eb5caa	\N	2	f	2024-09-07	2024-08-17 20:51:52.264	2024-08-17 20:51:52.264	\N	f	f	2024-08-18 18:08:00.154	misc	active
1f98c204-258f-40d8-b7c2-8794cd7f6a85	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	http://www.facebook.com	a482d4a7b5fa71	\N	11	f	2024-09-06	2024-08-18 15:35:35.068	2024-08-18 15:35:35.068	\N	t	f	2024-08-18 18:07:35.183	product	active
340d91f5-89fe-4391-8ddc-17a36f3293cd	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	https://www.techbazaar.pk	472e77cb012828	\N	2	f	2024-09-07	2024-08-20 10:40:51.622	2024-08-20 10:40:51.622	\N	f	f	\N	product	active
335f6bdf-abe5-4aa8-bed9-3d866faf6b0c	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	http://hotmail.com	4c3d581297714d	\N	3	f	2024-08-31	2024-08-20 10:56:42.17	2024-08-20 10:56:42.17	\N	f	f	\N	store	active
\.


--
-- Data for Name: url_click; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.url_click (click_id, url_id, access_date, access_time, ip_address, user_agent, referrer, country, city, created_at, updated_at, deleted_at, is_deleted) FROM stdin;
1	8036078f-6458-4221-9aa9-583394e091df	2024-08-11	17:59:17.414	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-11 17:59:17.418	2024-08-11 17:59:17.418	\N	f
2	03e0948a-a956-4af2-8b15-6278434ed419	2024-08-11	18:00:47.863	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-11 18:00:47.865	2024-08-11 18:00:47.865	\N	f
3	cef0fe64-2e7b-4073-bbd1-dc202b24ef3a	2024-08-12	08:07:54.668	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36	http://localhost:3000/	\N	\N	2024-08-12 08:07:54.671	2024-08-12 08:07:54.671	\N	f
4	cfbf2e40-72a1-488b-beed-c294667f1a86	2024-08-12	10:28:28.878	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-12 10:28:28.911	2024-08-12 10:28:28.911	\N	f
5	cfbf2e40-72a1-488b-beed-c294667f1a86	2024-08-12	10:28:47.279	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-12 10:28:47.282	2024-08-12 10:28:47.282	\N	f
6	cfbf2e40-72a1-488b-beed-c294667f1a86	2024-08-12	11:04:19.21	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-12 11:04:19.213	2024-08-12 11:04:19.213	\N	f
7	cfbf2e40-72a1-488b-beed-c294667f1a86	2024-08-17	19:26:04.145	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:26:04.149	2024-08-17 19:26:04.149	\N	f
8	cfbf2e40-72a1-488b-beed-c294667f1a86	2024-08-17	19:26:05.139	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:26:05.143	2024-08-17 19:26:05.143	\N	f
9	cfbf2e40-72a1-488b-beed-c294667f1a86	2024-08-17	19:26:39.996	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:26:40.005	2024-08-17 19:26:40.005	\N	f
10	cfbf2e40-72a1-488b-beed-c294667f1a86	2024-08-17	19:26:40.707	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:26:40.711	2024-08-17 19:26:40.711	\N	f
11	cfbf2e40-72a1-488b-beed-c294667f1a86	2024-08-17	19:29:04.915	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:29:04.923	2024-08-17 19:29:04.923	\N	f
12	cfbf2e40-72a1-488b-beed-c294667f1a86	2024-08-17	19:29:05.148	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:29:05.155	2024-08-17 19:29:05.155	\N	f
13	cfbf2e40-72a1-488b-beed-c294667f1a86	2024-08-17	19:30:58.184	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:30:58.191	2024-08-17 19:30:58.191	\N	f
14	cfbf2e40-72a1-488b-beed-c294667f1a86	2024-08-17	19:30:58.615	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:30:58.622	2024-08-17 19:30:58.622	\N	f
15	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:31:48.412	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:31:48.417	2024-08-17 19:31:48.417	\N	f
16	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:32:21.045	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:32:21.048	2024-08-17 19:32:21.048	\N	f
17	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:32:22.56	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:32:22.563	2024-08-17 19:32:22.563	\N	f
18	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:32:43.134	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:32:43.142	2024-08-17 19:32:43.142	\N	f
19	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:32:43.808	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:32:43.812	2024-08-17 19:32:43.812	\N	f
20	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:33:00.247	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:33:00.255	2024-08-17 19:33:00.255	\N	f
21	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:33:01.144	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:33:01.148	2024-08-17 19:33:01.148	\N	f
22	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:35:09.275	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:35:09.279	2024-08-17 19:35:09.279	\N	f
23	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:35:09.915	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:35:09.921	2024-08-17 19:35:09.921	\N	f
24	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:35:39.498	::1	PostmanRuntime/7.41.1		\N	\N	2024-08-17 19:35:39.503	2024-08-17 19:35:39.503	\N	f
25	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:35:42.511	::1	PostmanRuntime/7.41.1		\N	\N	2024-08-17 19:35:42.516	2024-08-17 19:35:42.516	\N	f
26	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:35:51.688	::1	PostmanRuntime/7.41.1		\N	\N	2024-08-17 19:35:51.692	2024-08-17 19:35:51.692	\N	f
27	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:36:06.502	::1	PostmanRuntime/7.41.1		\N	\N	2024-08-17 19:36:06.506	2024-08-17 19:36:06.506	\N	f
28	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:36:23.629	::1	PostmanRuntime/7.41.1		\N	\N	2024-08-17 19:36:23.633	2024-08-17 19:36:23.633	\N	f
29	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:36:30.452	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:36:30.456	2024-08-17 19:36:30.456	\N	f
30	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:36:31.154	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:36:31.166	2024-08-17 19:36:31.166	\N	f
31	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:36:38.841	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:36:38.846	2024-08-17 19:36:38.846	\N	f
32	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:36:39.362	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:36:39.372	2024-08-17 19:36:39.372	\N	f
33	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:39:56.826	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:39:56.831	2024-08-17 19:39:56.831	\N	f
34	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:39:57.564	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:39:57.568	2024-08-17 19:39:57.568	\N	f
35	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:42:42.226	::ffff:127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:42:42.231	2024-08-17 19:42:42.231	\N	f
36	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:42:49.939	::ffff:127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:42:49.945	2024-08-17 19:42:49.945	\N	f
37	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:42:50.577	::ffff:127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:42:50.581	2024-08-17 19:42:50.581	\N	f
38	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:42:53.836	::ffff:127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:42:53.842	2024-08-17 19:42:53.842	\N	f
39	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:42:54.239	::ffff:127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:42:54.244	2024-08-17 19:42:54.244	\N	f
40	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:42:57.395	::ffff:127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:42:57.398	2024-08-17 19:42:57.398	\N	f
41	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:42:57.972	::ffff:127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:42:57.976	2024-08-17 19:42:57.976	\N	f
42	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:43:05.017	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:43:05.022	2024-08-17 19:43:05.022	\N	f
43	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:43:11.769	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:43:11.772	2024-08-17 19:43:11.772	\N	f
44	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:43:16.606	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:43:16.609	2024-08-17 19:43:16.609	\N	f
45	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:43:26.162	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:43:26.165	2024-08-17 19:43:26.165	\N	f
46	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:43:34.727	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:43:34.73	2024-08-17 19:43:34.73	\N	f
47	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:43:38.015	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:43:38.018	2024-08-17 19:43:38.018	\N	f
48	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-17	19:43:44.527	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:43:44.532	2024-08-17 19:43:44.532	\N	f
49	cfbf2e40-72a1-488b-beed-c294667f1a86	2024-08-17	19:45:17.086	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:45:17.093	2024-08-17 19:45:17.093	\N	f
50	cfbf2e40-72a1-488b-beed-c294667f1a86	2024-08-17	19:45:34.43	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:45:34.434	2024-08-17 19:45:34.434	\N	f
51	cfbf2e40-72a1-488b-beed-c294667f1a86	2024-08-17	19:45:47.093	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:45:47.096	2024-08-17 19:45:47.096	\N	f
52	cfbf2e40-72a1-488b-beed-c294667f1a86	2024-08-17	19:45:52.863	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:45:52.867	2024-08-17 19:45:52.867	\N	f
53	cfbf2e40-72a1-488b-beed-c294667f1a86	2024-08-17	19:46:36.32	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-17 19:46:36.325	2024-08-17 19:46:36.325	\N	f
54	36d8bf97-a56d-4b2c-9dcb-0205bda6d667	2024-08-19	13:44:48.907	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0		\N	\N	2024-08-19 13:44:48.972	2024-08-19 13:44:48.972	\N	f
55	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-19	13:46:00.867	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0		\N	\N	2024-08-19 13:46:00.874	2024-08-19 13:46:00.874	\N	f
56	3db2dcbd-3593-4b07-90be-c03f4a0f6b96	2024-08-19	13:46:44.384	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-19 13:46:44.388	2024-08-19 13:46:44.388	\N	f
57	8ab15b75-b9d9-46a2-8e0c-123cec983b3f	2024-08-20	10:40:24.703	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-20 10:40:24.707	2024-08-20 10:40:24.707	\N	f
58	340d91f5-89fe-4391-8ddc-17a36f3293cd	2024-08-20	10:41:58.297	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36		\N	\N	2024-08-20 10:41:58.301	2024-08-20 10:41:58.301	\N	f
\.


--
-- Data for Name: url_tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.url_tag (tag_id, user_id, tag_name, created_at, updated_at, deleted_at, is_deleted) FROM stdin;
1	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	azadisale\n	2024-08-13 06:38:26.003	2024-08-13 06:38:26.003	\N	f
2	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	40% off	2024-08-13 06:42:20.377	2024-08-13 06:42:20.377	\N	f
3	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	azadisale	2024-08-13 07:59:23.065	2024-08-13 07:59:23.065	\N	f
4	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	azadisaleee	2024-08-13 07:59:32.447	2024-08-13 07:59:32.447	\N	f
6	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	14% disc	2024-08-18 17:33:14.894	2024-08-18 17:33:14.894	\N	f
11	4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	h	2024-08-18 18:07:35.145	2024-08-18 18:07:35.145	\N	f
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (user_id, username, email, password_hash, role_id, created_at, updated_at, deleted_at, is_deleted) FROM stdin;
b3b101c8-2c8f-4b0c-9450-6eb18a471b23	john_doe	john.doe@example.com	hashed_password_1	1	2024-07-30 10:00:00	2024-07-30 10:00:00	\N	f
c5d191c9-7c3b-49c1-b8c1-beb21c471b24	jane_doe	jane.doe@example.com	hashed_password_2	2	2024-07-30 10:00:00	2024-07-30 10:00:00	\N	f
d4a292ca-4d2f-4c2a-b5c2-ceb22c471b25	bob_smith	bob.smith@example.com	hashed_password_3	3	2024-07-30 10:00:00	2024-07-30 10:00:00	\N	f
afd0a1b1-babc-41d0-816d-f347fb51626e	zeeshanali	$2b$10$34GPDYv5Fo13G5OoTivgguXm601aHCfEWs2PKBHbBpXMOoo2H/MW.	zeeshanalico24@gmail.com	1	2024-08-02 07:58:03.164	2024-08-02 07:58:03.164	\N	f
dc6bb320-5947-451f-9e66-2e9df1bc8579	hello	hello@gmail.com	$2b$10$dwKL.AmHB6qGmG9hfguL6O/cMJo7mVWzQXP9Ex3aL7mleRBry5f9a	1	2024-08-02 13:02:02.099	2024-08-02 13:02:02.099	\N	f
cfda61bf-eca9-44a2-96eb-988aaf63a1bb	zeeshanalico24@gmail.com	zeeshanalico@gmail.com	$2b$10$yUOh7C9VwqAlGXuYBUFxYu3BAaBtDs7BzTIdiTmXyHWxaHX4fS2re	1	2024-08-06 05:28:50.866	2024-08-06 05:28:50.866	\N	f
f7b8d302-068d-4943-8266-8767ff5ef463	zee	zee@gmail.com	$2b$10$bWMzebhhFzNd6BQ8rCBqeujxLBaP9Shs/AKyNPKMgCO6/QSVLt1DS	1	2024-08-06 11:56:48.087	2024-08-06 11:56:48.087	\N	f
e5e393cb-5e3c-4e3b-b9c3-deb23c471b26	alice_jones	alice.jones@example.com	hashed_password_4	3	2024-07-30 10:00:00	2024-07-30 10:00:00	\N	f
f6f494cc-6f4d-4f4c-bac4-eeb24c471b27	charlie_brown	charlie.brown@example.com	hashed_password_5	3	2024-07-30 10:00:00	2024-07-30 10:00:00	\N	f
534738cc-c35f-41d1-9ff6-9155450d62d3	ali	islam@gmail.com	admin1	1	2024-08-02 10:48:11.008	2024-08-02 10:48:11.008	\N	f
ec40406f-23d1-49b8-ba2a-47c5cc4ec951	343	123456@gmail.com	$2b$10$sbi7p1e.FlaON6vjyDs0kOo4V/MfFBjcQ0Q1T8PMRONLMUbTim9By	3	2024-08-07 09:43:00.957	2024-08-07 09:43:00.957	\N	f
a678c5cb-5819-4cb4-aead-ea2b84bdde5e	poorlyheldfsdfs@gel.comallusion57363	heldfsdfs@gel.com	$2b$10$fZzHqzON69NgzZSYGfwNteYW1FLm48XS31fHjhupyrHOl.nOJ7I8m	3	2024-08-17 19:53:22.548	2024-08-17 19:53:22.548	\N	f
4ef62231-84c5-43bf-ad92-8bc167cdbf47	sdfsfsd	hello1@gmail.com	$2b$10$PNTr/QkIG2k.zQUmIRBWwem20vypOSqudA.8IPpDPZb4MStsZ4T72	1	2024-08-05 10:21:47.514	2024-08-05 10:21:47.514	\N	f
856536d6-15b8-4b57-9c2c-43c47dc98c9e	zeeshanalico	zeeshanalico24@gmail.com	$2b$10$MaJ1glxBcXUm5pKd5rTmBe9DGixcJnKSThnjZb5hhKzPg3kRmpAn2	1	2024-08-05 18:57:38.392	2024-08-05 18:57:38.392	\N	f
2683c458-6bb3-4d05-aa36-d6b287315a89	islam	$2b$10$xAGWoefJO7cQZJpGkZ/i5eTqan3ZGzuCXi1B/TB7zquklz8/xIoue	hmic@gmail.com	1	2024-08-02 12:23:23.92	2024-08-02 12:23:23.92	\N	f
41324429-4c6b-428e-88fd-e5a401100e15	hmic	$2b$10$Q08BO4iurc7LrZ0v6qZdd.ecn6RCJhWKwLxtnnsvSjqPVPSjTVF4C	hmic@gmail.com	1	2024-08-02 12:57:31.307	2024-08-02 12:57:31.307	\N	f
4ae3b08a-c2b6-46b2-94f7-d5ce540e8c9d	admin	admin@gmail.com	$2b$10$3cNJp/VuLnkU9zLTPE9lm.Rpio9n0S8XdcvV2JiDo/dg6f1fSmfHe	1	2024-08-06 06:50:00.184	2024-08-06 06:50:00.184	\N	f
\.


--
-- Data for Name: user_role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_role (role_id, role_name, description, created_at, updated_at, deleted_at, is_deleted) FROM stdin;
1	SUPER_ADMIN\n	Administrator role with full access	2024-07-30 10:00:00	2024-07-30 10:00:00	\N	f
2	ADMIN	All access\n	2024-07-30 10:00:00	2024-07-30 10:00:00	\N	f
3	USER	Regular user role with limited access	2024-07-30 10:00:00	2024-07-30 10:00:00	\N	f
\.


--
-- Name: api_key_api_key_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.api_key_api_key_id_seq', 17, true);


--
-- Name: audit_log_audit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.audit_log_audit_id_seq', 1, false);


--
-- Name: logo_logo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.logo_logo_id_seq', 12, true);


--
-- Name: url_click_click_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.url_click_click_id_seq', 58, true);


--
-- Name: url_tag_tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.url_tag_tag_id_seq', 11, true);


--
-- Name: user_role_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_role_role_id_seq', 4, true);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: api_key api_key_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.api_key
    ADD CONSTRAINT api_key_pkey PRIMARY KEY (api_key_id);


--
-- Name: audit_log audit_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_log
    ADD CONSTRAINT audit_log_pkey PRIMARY KEY (audit_id);


--
-- Name: logo logo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logo
    ADD CONSTRAINT logo_pkey PRIMARY KEY (logo_id);


--
-- Name: url_click url_click_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.url_click
    ADD CONSTRAINT url_click_pkey PRIMARY KEY (click_id);


--
-- Name: url url_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.url
    ADD CONSTRAINT url_pkey PRIMARY KEY (url_id);


--
-- Name: url_tag url_tag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.url_tag
    ADD CONSTRAINT url_tag_pkey PRIMARY KEY (tag_id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id);


--
-- Name: user_role user_role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_role_pkey PRIMARY KEY (role_id);


--
-- Name: api_key_api_key_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX api_key_api_key_key ON public.api_key USING btree (api_key);


--
-- Name: url_short_url_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX url_short_url_key ON public.url USING btree (short_url);


--
-- Name: user_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX user_email_key ON public."user" USING btree (email);


--
-- Name: user_role_role_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX user_role_role_name_key ON public.user_role USING btree (role_name);


--
-- Name: user_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX user_username_key ON public."user" USING btree (username);


--
-- Name: api_key api_key_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.api_key
    ADD CONSTRAINT api_key_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(user_id);


--
-- Name: audit_log audit_log_changed_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_log
    ADD CONSTRAINT audit_log_changed_by_fkey FOREIGN KEY (changed_by) REFERENCES public."user"(user_id);


--
-- Name: audit_log audit_log_url_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_log
    ADD CONSTRAINT audit_log_url_id_fkey FOREIGN KEY (url_id) REFERENCES public.url(url_id) ON DELETE CASCADE;


--
-- Name: logo logo_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logo
    ADD CONSTRAINT logo_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(user_id) ON DELETE CASCADE;


--
-- Name: url_click url_click_url_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.url_click
    ADD CONSTRAINT url_click_url_id_fkey FOREIGN KEY (url_id) REFERENCES public.url(url_id) ON DELETE CASCADE;


--
-- Name: url url_logo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.url
    ADD CONSTRAINT url_logo_id_fkey FOREIGN KEY (logo_id) REFERENCES public.logo(logo_id);


--
-- Name: url url_tag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.url
    ADD CONSTRAINT url_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.url_tag(tag_id);


--
-- Name: url_tag url_tag_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.url_tag
    ADD CONSTRAINT url_tag_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(user_id) ON DELETE CASCADE;


--
-- Name: url url_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.url
    ADD CONSTRAINT url_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(user_id) ON DELETE CASCADE;


--
-- Name: user user_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.user_role(role_id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

