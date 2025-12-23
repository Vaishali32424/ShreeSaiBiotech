from logging.config import fileConfig
import os
from app.models import *
from sqlalchemy import engine_from_config, pool
from alembic import context

# this is the Alembic Config object
config = context.config

# Interpret the config file for Python logging.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# IMPORT YOUR Base
from app.database import Base  # adjust if path differs
target_metadata = Base.metadata


def get_database_url():
    url = os.getenv("DATABASE_URL")
    if not url:
        raise RuntimeError("DATABASE_URL is not set")
    return url


def run_migrations_offline():
    context.configure(
        url=get_database_url(),
        target_metadata=target_metadata,
        literal_binds=True,
        compare_type=True,
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    connectable = engine_from_config(
        {
            "sqlalchemy.url": get_database_url()
        },
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
        connect_args={"sslmode": "require"},  # REQUIRED for Supabase
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
