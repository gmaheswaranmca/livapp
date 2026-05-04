Here’s a **broad mental map** across many real-world apps.
Format: **App | Services | Event / Cross-transaction flow**

---

| App                       | Services (comma-separated)                                                       | Event / Cross-transaction flow                      |
| ------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------- |
| E-commerce                | Search, Catalog, Cart, Order, Inventory, Payment, Shipping, User, Recommendation | Order → Inventory → Payment → Shipping              |
| Ride-hailing              | Rider, Driver, Matching, Location, Trip, Pricing, Payment, Notification          | Ride Request → Match → Trip → Payment               |
| Healthcare                | Patient, Doctor, Appointment, Prescription, Lab, Pharmacy, Billing, Insurance    | Appointment → Consultation → Prescription → Billing |
| Banking                   | Account, Transaction, Payment, Fraud, Notification, Loan                         | Payment → Fraud Check → Transfer → Notify           |
| Food Delivery             | User, Restaurant, Menu, Cart, Order, Delivery, Payment, Notification             | Order → Restaurant → Delivery → Payment             |
| Hotel Booking             | Search, Room, Booking, Payment, Review, Notification                             | Search → Booking → Payment → Confirmation           |
| Airline Booking           | Search, Seat, Booking, Payment, Check-in, Notification                           | Booking → Payment → Ticket → Check-in               |
| Email (Gmail)             | Auth, Compose, Delivery, Spam, Storage, Notification                             | Compose → Spam Check → Deliver                      |
| Messaging (WhatsApp)      | User, Chat, Delivery, Presence, Media, Notification                              | Send → Deliver → Notify                             |
| Social Network (Facebook) | User, Feed, Post, Comment, Like, Notification, Ads                               | Post → Feed → Notify                                |
| Photo Sharing (Instagram) | User, Media, Feed, Story, Comment, Like, Notification                            | Upload → Process → Feed                             |
| Video (YouTube)           | Upload, Transcode, Streaming, Recommendation, Ads, Comment                       | Upload → Transcode → Publish                        |
| OTT Streaming (Netflix)   | User, Content, Streaming, Recommendation, Billing                                | Subscribe → Payment → Stream                        |
| Music (Spotify)           | User, Playlist, Streaming, Recommendation, Ads                                   | Play → Recommend                                    |
| Job Portal                | User, Job, Resume, Search, Application, Notification                             | Apply → Notify Employer                             |
| Learning Platform         | Course, User, Enrollment, Video, Quiz, Certificate                               | Enroll → Learn → Certificate                        |
| Online Exam               | User, Exam, Question, Evaluation, Result                                         | Submit → Evaluate → Result                          |
| Logistics                 | Order, Warehouse, Inventory, Delivery, Tracking                                  | Order → Dispatch → Deliver                          |
| Courier                   | Booking, Pickup, Routing, Delivery, Tracking                                     | Pickup → Route → Deliver                            |
| Taxi Fleet                | Vehicle, Driver, Assignment, Tracking, Billing                                   | Assign → Trip → Bill                                |
| Event Booking             | Event, Seat, Booking, Payment, Notification                                      | Book → Pay → Confirm                                |
| Ticketing                 | Show, Seat, Booking, Payment                                                     | Book → Pay                                          |
| News App                  | Content, Feed, Recommendation, Notification                                      | Publish → Feed                                      |
| Blogging                  | User, Post, Comment, Like                                                        | Post → Notify                                       |
| Forum                     | User, Thread, Comment, Vote                                                      | Post → Reply                                        |
| Gaming                    | User, Matchmaking, Game, Score, Leaderboard                                      | Match → Play → Score                                |
| Fantasy Sports            | User, Contest, Team, Result, Wallet                                              | Join → Play → Result                                |
| Stock Trading             | User, Portfolio, Order, Market Data, Settlement                                  | Order → Execute → Settle                            |
| Crypto Exchange           | Wallet, Trade, Order, Market, Security                                           | Trade → Settle                                      |
| Wallet App                | User, Wallet, Transaction, Payment, Notification                                 | Pay → Update Balance                                |
| Subscription SaaS         | User, Plan, Billing, Usage, Notification                                         | Subscribe → Bill                                    |
| CRM                       | Lead, Customer, Deal, Activity                                                   | Lead → Deal                                         |
| ERP                       | Inventory, Order, Finance, HR                                                    | Order → Finance                                     |
| HR System                 | Employee, Payroll, Attendance, Leave                                             | Work → Payroll                                      |
| School System             | Student, Teacher, Class, Exam, Result                                            | Exam → Result                                       |
| Library                   | Book, Member, Issue, Return                                                      | Issue → Return                                      |
| Travel Planner            | User, Itinerary, Booking, Payment                                                | Plan → Book                                         |
| Maps                      | Location, Routing, Traffic, Search                                               | Search → Route                                      |
| Navigation                | GPS, Route, Traffic, Alert                                                       | Navigate → Alert                                    |
| IoT Platform              | Device, Data, Analytics, Alert                                                   | Data → Alert                                        |
| Smart Home                | Device, Control, Automation, Notification                                        | Trigger → Action                                    |
| Chatbot                   | NLP, Intent, Response, Context                                                   | Query → Response                                    |
| AI Assistant              | Speech, NLP, Task, Integration                                                   | Input → Action                                      |
| Advertising               | Campaign, Targeting, Bidding, Analytics                                          | Bid → Serve Ad                                      |
| Analytics                 | Data Ingest, Processing, Dashboard                                               | Ingest → Analyze                                    |
| File Storage              | Upload, Storage, Sharing, Access                                                 | Upload → Share                                      |
| Collaboration             | Document, Edit, Sync, Comment                                                    | Edit → Sync                                         |
| Version Control           | Repo, Commit, Branch, Merge                                                      | Commit → Merge                                      |
| CI/CD                     | Build, Test, Deploy, Monitor                                                     | Code → Build → Deploy                               |
| Monitoring                | Metrics, Logs, Alerting                                                          | Detect → Alert                                      |
| Security/Auth             | Auth, Token, Access Control                                                      | Login → Token                                       |

---

# 🧠 What you should observe

* Every app = **set of domain services**
* Only some flows are **cross-transactions**
* Most traffic = **independent service usage**

---

If you want, I can next:

* Pick 1–2 apps and show **real production-level architecture (with DB + API + Kafka)**
* Or map this table into your **Node.js microservice folders (order-service, etc.)**
