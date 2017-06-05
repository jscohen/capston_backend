#!/bin/bash

API="http://localhost:4741"
URL_PATH="/docs"
TOKEN="zo5PcVSlf3OkEX5gD9BPVMXtLe9gt4iJsuhQpllFh5c=--6PVphv35oILBEwpRbASpuV5hsEcu3E0ZbwjOjfZ9Q4Q="
OWNERID="591de455d9e65d72ad095f38"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "doc": {
      "text": "Test",
      "_owner": "'"${OWNERID}"'"
    }
  }'

echo
