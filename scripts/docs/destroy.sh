#!/bin/bash

API="http://localhost:4741"
URL_PATH="/docs"
TOKEN="zo5PcVSlf3OkEX5gD9BPVMXtLe9gt4iJsuhQpllFh5c=--6PVphv35oILBEwpRbASpuV5hsEcu3E0ZbwjOjfZ9Q4Q="
ID="593563a78bc3af325eb8f491"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Token token=${TOKEN}"

echo
