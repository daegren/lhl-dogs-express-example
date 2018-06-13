## Review

Q: What is a HTTP server?

* Computer which is serving files/data using the HTTP protocol
* It responds to requests

Q: What is a HTTP client?

* Allows a user to make requests to an HTTP server
* Doesn't have to be user driven, could be another server
* Receives a response from the HTTP server

Q: What does the following code do?

```javascript
app.get("/", (req, res) => {
  res.render("index");
});
```

* When the server receives a request for `GET /`, the server will render out the `index` template.
* Express router code

Q: What is a route?

* HTTP Verb + Path

## Safe and Idempotency

* `GET` Safe, Idempotent, retrieve data
* `POST` Not Safe, Not Idempotent, create data
* `PUT` Not Safe, Idempotent, update data
* `DELETE` Not Safe, Idempotent, remove data

## CRUD

### Create

`GET /dogs/new` - Form for creating a new dog
`POST /dogs` - Actually create a dog on our server

### Read

`GET /dogs` - (Index) List of all our dogs in the system
`GET /dogs/:id` - Show info for a single dog

### Update

`GET /dogs/:id/edit` - Show edit form for a dog
`PUT /dogs/:id` - Actually edit the dog resource

### Delete

`DELETE /dogs/:id` - Delete a dog from our system
