#!/usr/bin/env bash
set -euo pipefail

required_files=(
  "AGENTS.md"
  "docs/01-prodotto.md"
  "docs/02-architettura.md"
  "docs/03-database.md"
  "docs/04-api.md"
  "docs/05-ui-accessibilita.md"
  "docs/06-sicurezza-privacy.md"
  "docs/07-test-e-qualita.md"
  "docs/08-roadmap.md"
  "decisions/ADR-001-monolite-modulare.md"
  "tasks/TASK_TEMPLATE.md"
)

for required_file in "${required_files[@]}"; do
  if [[ ! -f "$required_file" ]]; then
    echo "ERRORE: file obbligatorio mancante: $required_file" >&2
    exit 1
  fi
done

if rg -n --hidden -g '!scripts/check-harness.sh' \
  "(password|secret|token)[[:space:]]*[:=][[:space:]]*[\"'][^\\$<{][^\"']{7,}[\"']" .; then
  echo "ERRORE: possibile segreto inserito nei file del progetto." >&2
  exit 1
fi

echo "Harness presente. Eseguire anche build, lint e test del progetto."
