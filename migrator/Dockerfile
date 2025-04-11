ARG PYTHON_VERSION=3.13
FROM python:${PYTHON_VERSION}-slim AS base
WORKDIR /migrator
EXPOSE 4000

ARG POETRY_VERSION=1.8.4
FROM base AS deps
COPY pyproject.toml poetry.lock ./
RUN pip install --no-cache poetry==$POETRY_VERSION
RUN python -m poetry install --only main --no-cache --no-ansi

FROM deps AS final
COPY data/ ./data/
COPY src/ ./src/
COPY *.env ./

CMD ["poetry", "run", "python", "-m", "src.main"]
