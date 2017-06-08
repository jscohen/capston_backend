#!/bin/bash

API="http://localhost:4741"
URL_PATH="/docs"
TOKEN="TQeUYQpAr0p79D+0add52peNzW6v+EZvLv3btyp1FlU=--NHeCDHtQ97OhI6FLHfiEW/MbOVMfEg71D3d7MVhV1Us="
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