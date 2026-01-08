// MongoDB initialization script
db = db.getSiblingDB('ore-o');

db.createUser({
  user: 'oreo_user',
  pwd: 'oreo_password',
  roles: [
    {
      role: 'readWrite',
      db: 'ore-o'
    }
  ]
});

db.createCollection('users');
print('Database and collection initialized successfully');