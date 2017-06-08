#!/bin/bash

API="http://localhost:4741"
URL_PATH="/translate"
TOKEN="F+hEiYL9CCukUaRXYOwgqGLnawn9NmUKiklE2vtSxqw=--OIBCMj6ACPAKpGNfwx41jnWe644fRbtLM1qRJNd/L00="
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
