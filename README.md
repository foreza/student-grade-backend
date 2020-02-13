
# Student Grade Project


## Frontend: 

### For the AJAX/client side javascript implementation, navigate to:
http://localhost:3000/basic_index.html

- Calls APIs for get, post, update, delete using jQuery AJAX 
- Stores darkMode state locally using the local window's localStorage

### For the server side rendered (SSR) version, navigate to:
http://localhost:3000/

- Is served to the client on every page modification 
- Retains state through URL query params
- Store darkMode as a cookie


## Backend:

### [GET] Get all students:

```
/students/get
```

Returns all students. Returns either an empty collection or 1-many students.

*Example success response:*
```
TODO
```

*Fail response:*
```
TODO
```


### [GET] Get a specific student by ID:

```
/students/get/:id
```

Returns a specific student given a unique id. Returns either with an empty collection or the student object.

*Example success response:*
```
TODO
```

*Fail response:*
```
TODO
```


### [POST] Add a specific student:

```
/students/
```

Adds a new student given a provided student object.

*Example Payload:*
```
TODO
```

*Example success response:*
```
TODO
```

*Fail response:*
```
TODO
```
