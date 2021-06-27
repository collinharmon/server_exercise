# server_exercise
A web server that responds to API requests and returns an available multicast(MCA) (224.0.0.0/4) address

app.js contains an express server implementation for the providing and removal/recyclying of MCA addresses. `mcas.json` is used to track the next available MCA address in the sequence, as well as tracking the recycled MCA addresses.

Tested with jest/supertest, `/tests/router.test.js` (artifacts under `/tests/artifacts/`).
