--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4 (Ubuntu 14.4-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.4 (Ubuntu 14.4-0ubuntu0.22.04.1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: author; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.author (
    id text NOT NULL,
    name text NOT NULL
);


--
-- Name: book; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.book (
    id text NOT NULL,
    title text NOT NULL,
    year timestamp(3) without time zone NOT NULL,
    price double precision NOT NULL,
    stock integer NOT NULL,
    "authorId" text NOT NULL
);


--
-- Data for Name: author; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.author (id, name) FROM stdin;
530282ef-1778-4e04-81a7-f8634610d4b9	J. K. Rowling
58c10a53-85c5-4c3c-bcf7-cee39d60d05f	Stephen King
\.


--
-- Data for Name: book; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.book (id, title, year, price, stock, "authorId") FROM stdin;
63524221-fef4-4224-b5f5-9d8751a0f46e	It	1986-09-15 06:00:00	15.24	2000	58c10a53-85c5-4c3c-bcf7-cee39d60d05f
\.


--
-- Name: author author_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.author
    ADD CONSTRAINT author_pkey PRIMARY KEY (id);


--
-- Name: book book_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.book
    ADD CONSTRAINT book_pkey PRIMARY KEY (id);


--
-- Name: book book_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.book
    ADD CONSTRAINT "book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public.author(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

