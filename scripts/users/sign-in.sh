#!/bin/bash

API="http://localhost:4741"
URL_PATH="/users"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request POST \
  --data '{
    "user": {
      "email": "m@m.com",
      "password": "m'
    }
  }'
