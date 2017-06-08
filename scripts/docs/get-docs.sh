#!/bin/bash

API="http://localhost:4741"
URL_PATH="/docs"
TOKEN="F+hEiYL9CCukUaRXYOwgqGLnawn9NmUKiklE2vtSxqw=--OIBCMj6ACPAKpGNfwx41jnWe644fRbtLM1qRJNd/L00="
ID="59386213091f963a4ba0cd14"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN"
