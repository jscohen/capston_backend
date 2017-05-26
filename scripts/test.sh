#!/bin/bash

API="http://localhost:4741"
URL_PATH="/tests"
TOKEN='hPiDxUGQqtKfuAWIEbpa6k1xp7Ws9NRFsibubVMp4rQ=--D1j0Z3h7dfssrStpImBxjCZIgUwQBVOiVayGE247Yw4='
OWNERID="591de455d9e65d72ad095f38"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "test": {
      "totalPrice": "5",
      "_owner": "'"${OWNERID}"'"
    }
  }'

echo
