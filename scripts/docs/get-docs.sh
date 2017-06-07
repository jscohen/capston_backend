#!/bin/bash

API="http://localhost:4741"
URL_PATH="/docs"
TOKEN="ne3Uh1wbhi4TNKnnmdAtDFVGH5lrSyAK6ogVJX2TTAg=--hCVhWlwSLyQGXyvUXAS9CtsqsbCQZ4jbHmxnDiQHWPM="
ID="591de455d9e65d72ad095f38"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN"
