#!/usr/bin/env bash
set -euo pipefail

SERVICE="${SERVICE:-postgres}"
DB_USER="superplanify"
DB_NAME="superplanify_bench"

COMPOSE_YAML_PATH="../../docker/compose.yaml"
DATABASE_SCRIPTS_PATH="../scripts"

run_psql_file() {
    local file="$1"

    docker compose -f "$COMPOSE_YAML_PATH" exec -T "$SERVICE" \
        psql \
        -v ON_ERROR_STOP=1 \
        -U "$DB_USER" \
        -d "$DB_NAME" \
        < "$file"
}

reset_benchmark_db() {
    docker compose -f "$COMPOSE_YAML_PATH" exec -T "$SERVICE" \
        dropdb \
        -U "$DB_USER" \
        --if-exists \
        "$DB_NAME"

    docker compose -f "$COMPOSE_YAML_PATH" exec -T "$SERVICE" \
        createdb \
        -U "$DB_USER" \
        "$DB_NAME"

    run_psql_file "$DATABASE_SCRIPTS_PATH/001_initial_schema.sql"
}

seed_benchmark_db() {
    run_psql_file "seed_1000_schedules_1000_unique_events.sql"
}

run_index_experiment() {
    run_psql_file "compare_index.sql"
}

run_dashboard_experiment() {
    run_psql_file "benchmark_user_dashboard.sql"
}

case "${1:-}" in
    reset)
        reset_benchmark_db
        ;;

    seed)
        reset_benchmark_db
        seed_benchmark_db
        ;;

    index-experiment)
        run_index_experiment
        ;;
    
    dashboard)
        reset_benchmark_db
        run_dashboard_experiment
        ;;

    *)
        echo "Usage: $0 {reset|seed|dashboard|index-experiment}"
        exit 1
        ;;
esac