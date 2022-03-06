## About
A boilerplate for crud REST api with express sequelize, and postgresql with multiple role jwt authentication.

## Installation
First, make a database with certain tables.

```
CREATE TABLE public.books (
    id bigint NOT NULL,
    title character varying(255) NOT NULL,
    year integer NOT NULL,
    author_id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
CREATE TABLE public.authors (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_author_id_foreign FOREIGN KEY (author_id) REFERENCES public.authors(id) ON DELETE CASCADE;
CREATE TABLE public.users (
	id varchar(255) NOT NULL,
	name varchar(255) NULL,
	email varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	avatar_path varchar(255) NULL,
	verification_code varchar(255) NULL,
	email_verification_sent_at timestamp(0) NULL,
	email_verification_verified_at timestamp(0) NULL,
	created_at timestamp(0) NULL,
	updated_at timestamp(0) NULL,
	CONSTRAINT users_email_unique UNIQUE (email),
	CONSTRAINT users_pkey PRIMARY KEY (id)
);
CREATE TABLE public.roles (
	id varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	created_at timestamp(0) NULL,
	updated_at timestamp(0) NULL,
	CONSTRAINT roles_pkey PRIMARY KEY (id)
);
CREATE TABLE public.users_to_roles (
	id bigserial NOT NULL,
	user_id varchar(255) NOT NULL,
	role_id varchar(255) NOT NULL,
	created_at timestamp(0) NULL,
	updated_at timestamp(0) NULL,
	CONSTRAINT users_to_roles_pkey PRIMARY KEY (id)
);
ALTER TABLE public.users_to_roles ADD CONSTRAINT users_to_roles_role_id_foreign FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE CASCADE;
ALTER TABLE public.users_to_roles ADD CONSTRAINT users_to_roles_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
```

Set an .env
```
ENV=dev
APP_NAME=express-rest
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_HOST=127.0.0.1
APP_URL=http://localhost
APP_PORT=3000
DB_CONNECTION=postgres
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=db_express_rest
DB_USERNAME=
DB_PASSWORD=
UPLOAD_FOLDER = 'static/uploads/'
JWT_SECRET_KEY=secret-code
```

Install packages
```
npm install
```

Then run with the command
```
npm start
```

Open this link on your browser or use Postman instead.
```
http:://127.0.0.1:{yourPort}/books
```