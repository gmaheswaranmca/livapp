# Create Server App (Node Typescript Express - ES6)
```bash
cd server/
npm init 
npm install express mongoose jsonwebtoken cors dotenv
npm install -D ts-node-dev typescript
npm install -D @types/cors
npm install -D @types/express @types/node @types/jsonwebtoken

npm install bcrypt
npm install --save-dev @types/bcrypt
```

# Server (Express JS App)
```bash
# About App - Technical Information
# ... to be updated ...
Settigup Reading Env Vars from .env file
  READ configurations from Env Vars PORT, MONGO_URI, JWT_SECRET
Create App  
  Add middlewares 
    CORS
    JSON

Create mongoose models 
  admin_user model = from admin_user schema 
  trainer model = from trainer schema
  audit model = from audit schema
  last_update model = from last_update schema

Define middlewares and utility 
  middlewares:
    authMiddleware  : token verification, sets token user in req.user  
    roleMiddleware hof : for param role numbers to hof, 
      getting middleware : to check: given param role matches user role

  utility
    logAudit entry and update to lastUpdate

API End Points
  Auth
    login API : POST /api/login {email, password} -> { token }
      
      for matched user, for token
  Trainer
    list: GET /api/trainers -> [{ ie trainer json }]
      authMiddleware
      find Trainers filter "name contains search"
    create: POST /api/trainers 
      ... { body+, updated_user_id from req.user}
        -> { createdTrainer json }
      authMiddleware, roleMiddleware([1, 2, 3, 4])
      create Trainer
      op+: logAudit
    view: GET /api/trainers/:id -> { ie trainer json }
      authMiddleware, roleMiddleware([1, 2, 3, 4])
      query filter "name contains search"
    update: PUT /api/trainers/:id 
      ... { body+, updated_user_id from req.user}
        -> { createdTrainer json }
      authMiddleware, roleMiddleware([2, 3, 4])
      findByIdAndUpdate Trainer
      op+: logAudit   
    delete: DELETE /api/trainers/:id 
      ... { body+, updated_user_id from req.user}
        -> { createdTrainer json }
      authMiddleware, roleMiddleware([3, 4])
      findByIdAndDelete Trainer
      op+: logAudit
Init super user
  createSuperUser
Start Server
  mongoose.connect
    -> createSuperUser
    -> app.liste PORT
```

# Further...