# Key decisions
PR #1: codebase setup
- Kept the frontend and API intentionally blank so generated examples do not become accidental product architecture.
- Separated Fastify app construction from process startup so API routes can be tested without binding to a network port.
- Centralized validated environment configuration and shared Kysely/Redis clients, while leaving the database schema undefined until the domain model is established.
- Used one root Dockerfile with separate frontend and backend targets, composed with PostgreSQL and Redis.
- Established shared linting, typechecking, testing, build, and CI commands before feature implementation.