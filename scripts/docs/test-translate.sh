#!/bin/bash

API="http://localhost:4741"
URL_PATH="/translate"
TOKEN="TQeUYQpAr0p79D+0add52peNzW6v+EZvLv3btyp1FlU=--NHeCDHtQ97OhI6FLHfiEW/MbOVMfEg71D3d7MVhV1Us="
ID="59386213091f963a4ba0cd14"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "doc": {
      "id": "59386213091f963a4ba0cd14",
      "text": "test",
      "language": "it"
    }
  }'

echo
