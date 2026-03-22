# Project : Trainer Management System (app) 
* Number Code : z0001 
* Technical Stack Code: WslUbuTraTsrDcrBs_NonTseDcrDvoNonNonNmoDcr
  * Wsl : Windows Subsystem for Linux 
  * Ubu : Wsl Ubuntu 24.04 LTS
    * Contains Client Docker, Server Docker, Database Docker
    * Under Docker Compose
  * Tra : Trainer Management System
  * Tsr : Type Script React (ES6)
  * Dcr : Docker for client 
  * Bs_ : Bootstrap UI 
  * Non : No Cache for client 
  * Tse : Type Scripe Express (ES6)
  * Dcr : Docker for server 
  * Dvo : Docker volume managed by daemon / engine
  * Non : No Load Balancer
  * Non : No Gateway 
  * Nmo : Nosql Mongo DB
  * Dcr : Docker for Database 
* Project : Trainer Management System
* Database : 
  * trainer {id, name, skills, photo, status, updated_user_id, updated_time}
    * statis: Active | Inactive 
  * admin_users {id, email, password, role, updated_time}
    * role: 1 - agent | 2 - officer | 3 - manager | 4 - su ie super user
      * agent : list or search | create | view
      * officer: agent + | edit
      * manager: delete
      * Default Super User:
        * Row: {id: ?, email: 'su@gmail.com', password: '1234' -encrypted/encoded, role:4, updated_time: ?}
        * Created During First Time App Runs...
  * last_update {id, updated_time} 
    * one row table 
  * audit : {id, table, op, payload, updated_time}
    * op: create | update | delete | partial update
* Features :
  * On Trainer, 
    * list or search / create / view / edit / delete  +  pagination / breadcrum etc
* Prompt 
  * Give me project structure, code for client and server, code for dockers and docker compose,
  * client is vite react typescript
    * read configuration from env file
    * App Component
      * contains Route Definition with PrivateRoute Provider
    * pages/[new.tsx, edit.tsx, index.tsx, login.tsx]
      * Under PrivateRoute Provider other than login.tsx
        * Contains PrivateNavbar and Child inside
      * login Page contains PublicNavbar
        * Store logged in detail ie JWT token in 
    * components/TrainerForm(mode=edit/new, id=?)
    * components/PrivateNavbar|PublicNavbar
      * contains menus and Logout option 
      * It is part of every page
    * services/api 
      * contains server calls
    * services/types
      * contains type 
        * Trainer
          * Contains User
        * User 
          * To Sign In
    * cdn bootstrap is used inside index.html
  * server is typescript node express es6 single file
    * odm - ie object mongo map
    * read configuration from env file
      * APP PORT, MONGO URI, etc
    * Trainer ops or api end points are under JWT role based authentication and authorizatrion
    * Login api end point will send the JWT and user details in token 
      * token : user_id, email, role 
  * Development code will be written in Windows Computes
  * Detailed Steps also needed to complete the code and to run using docker compose
* Note: You can plan step by step completion ie support to me. No one shop requirement from you. Give me plan how can you help me, i will follow the steps.