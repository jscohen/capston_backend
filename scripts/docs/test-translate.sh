#!/bin/bash

API="http://localhost:4741"
URL_PATH="/translate"
TOKEN="CwThT9LG/R6XTv3DBj1hqmR/PWu3VjsQ9HDhGktqfSA=--D6g5+IuFAVuDp3+H8pVR7sPl7Y5jgyjY1OcBmwQDVPY="
ID="5939ae70e3fa7e6e3fdf778d"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "doc": {
      "id": "59386213091f963a4ba0cd14",
      "text": "test",
      "fromLanguage": "en",
      "toLanguage": "it"
    }
  }'

echo
