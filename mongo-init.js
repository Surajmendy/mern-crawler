db.createUser({
  user: "suraj",
  pwd: "12345678",
  roles: [
    {
      role: "readWrite",
      db: "mern-test"
    }
  ]
});
