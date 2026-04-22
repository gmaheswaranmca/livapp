# 📄 Abstract / Requirements – MTD Website

## 1. System Overview

The system shall provide a **role-based web platform** for managing training programs, student assessments, feedback collection, and performance analytics across multiple institutions.

---

## 2. User Management

* The system shall support multiple user roles, including **Super Admin, Admin, Super Client, Sub Client, and Student**.
* The system shall enforce a **hierarchical relationship** among users, where higher-level roles can create and manage subordinate roles.
* The system shall associate each student with a specific client (institution or department).

---

## 3. Authentication & Authorization

* The system shall provide a **unified login interface** for all users.
* The system shall authenticate users based on credentials and **redirect them according to their roles**.
* The system shall support login using multiple identifiers (e.g., unique ID, email, or phone number).
* The system shall provide a **secure password reset mechanism using OTP verification**.
* The system shall not allow public self-registration and shall restrict access to pre-configured users only.
* The system shall implement appropriate **security measures to prevent unauthorized access and brute-force attacks**.

---

## 4. Student Management

* The system shall maintain student profiles containing basic personal and academic information.
* The system shall require students to set their password through a secure reset process upon first login.
* The system shall ensure that students are linked to relevant training programs and clients.

---

## 5. Assessment Management

* The system shall provide an **online assessment module** supporting multiple question types, including objective and coding-based questions.
* The system shall enforce **time-bound assessments** with automated timers.
* The system shall support features such as **question navigation, bookmarking, and review marking**.
* The system shall ensure that each assessment can be attempted **only once per student**.
* The system shall support configurable evaluation rules, including **negative marking**.

---

## 6. Feedback Management

* The system shall allow students to submit **structured feedback** for trainers and training sessions.
* The system shall restrict feedback submission to **a single attempt per student per session**.
* The system shall provide confirmation and prevent duplicate submissions.

---

## 7. Analytics & Reporting

* The system shall collect and store data related to **student performance, feedback, and participation**.
* The system shall provide **data visualization dashboards** for administrators.
* The system shall generate **downloadable reports in PDF format**.
* The system shall display usage metrics such as **weekly and monthly activity statistics**.

---

## 8. User Interface & Experience

* The system shall provide **role-specific dashboards and navigation menus**.
* The system shall present a consistent interface with access to relevant features such as profile management, assessments, feedback, and results.
* The system shall provide appropriate notifications and messages for user actions.

---

## 9. Data Management

* The system shall maintain structured relationships among core entities such as students, trainers, and clients.
* The system shall ensure **data integrity, consistency, and secure storage**.

---

## 10. Deployment & Infrastructure

* The system shall support automated infrastructure provisioning and deployment using Infrastructure-as-Code practices (e.g., Terraform).
* The system shall enable management of domains and subdomains for scalable deployment.

---

## 11. Compliance & Constraints

* The system shall enforce **one-time participation constraints** for assessments and feedback.
* The system shall ensure **secure handling of user credentials and sensitive data**.
* The system shall operate within a controlled environment without open public registration.

---

## ✅ Summary

These abstract requirements define **what the system must achieve**, without specifying implementation details, enabling further design, architecture, and development planning.

