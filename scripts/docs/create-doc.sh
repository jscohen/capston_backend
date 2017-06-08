#!/bin/bash

API="http://localhost:4741"
URL_PATH="/docs"
TOKEN="CwThT9LG/R6XTv3DBj1hqmR/PWu3VjsQ9HDhGktqfSA=--D6g5+IuFAVuDp3+H8pVR7sPl7Y5jgyjY1OcBmwQDVPY="
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
