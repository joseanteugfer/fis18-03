#!/usr/bin/env bash
curl -X PUT \-H "Content-Type: application/json" \
   -d @pacts/client-ordenesPagoervice.json \
http://localhost:8080/pacts/provider/OrdenPagoService/consumer/client/version/2.0.0