-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.patients (
  id integer NOT NULL DEFAULT nextval('patients_id_seq'::regclass),
  email text,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT patients_pkey PRIMARY KEY (id)
);
CREATE TABLE public.sessions (
  id integer NOT NULL DEFAULT nextval('sessions_id_seq'::regclass),
  patient_id integer,
  room_code text NOT NULL UNIQUE,
  started_at timestamp without time zone DEFAULT now(),
  ended_at timestamp without time zone,
  CONSTRAINT sessions_pkey PRIMARY KEY (id),
  CONSTRAINT sessions_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id)
);
CREATE TABLE public.survey_responses (
  id integer NOT NULL DEFAULT nextval('survey_responses_id_seq'::regclass),
  session_id integer,
  question text NOT NULL,
  answer text NOT NULL,
  CONSTRAINT survey_responses_pkey PRIMARY KEY (id),
  CONSTRAINT survey_responses_session_id_fkey FOREIGN KEY (session_id) REFERENCES public.sessions(id)
);
CREATE TABLE public.game_results (
  id integer NOT NULL DEFAULT nextval('game_results_id_seq'::regclass),
  session_id integer,
  game_number integer NOT NULL,
  score integer,
  duration_seconds integer,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT game_results_pkey PRIMARY KEY (id),
  CONSTRAINT game_results_session_id_fkey FOREIGN KEY (session_id) REFERENCES public.sessions(id)
);