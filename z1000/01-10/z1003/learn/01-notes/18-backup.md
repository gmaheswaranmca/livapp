## 18. Backup & Recovery 🔥 (Production Safety)

---

## 🔹 What is Backup & Recovery?

* **Backup** → Copy of database
* **Recovery** → Restore data when something goes wrong

👉 In simple terms:

> Backup = “Insurance for your data”

---

## 🔹 Why It’s Critical?

Without backup:

* ❌ Data loss = permanent
* ❌ System failure = business loss

With backup:

* ✅ Restore quickly
* ✅ Prevent disasters

---

## 🔹 Types of Backup

| Type                | Description                    |
| ------------------- | ------------------------------ |
| Full Backup         | Entire database                |
| Incremental Backup  | Only changed data              |
| Differential Backup | Changes since last full backup |

---

# 🔸 1. Full Backup 🔥

---

## 🔹 Using `mysqldump`

---

### 📌 Backup Entire Database

```bash
mysqldump -u root -p company_db > backup.sql
```

---

### 📌 Backup All Databases

```bash
mysqldump -u root -p --all-databases > all_backup.sql
```

---

### 📌 Backup Specific Tables

```bash
mysqldump -u root -p company_db employees orders > backup.sql
```

---

---

# 🔸 2. Restore Database 🔥

---

### 📌 Restore from Backup

```bash
mysql -u root -p company_db < backup.sql
```

---

---

# 🔸 3. Incremental Backup

---

## 🔹 What is Incremental Backup?

* Backup only **new changes since last backup**

---

## 🔹 Uses Binary Logs (binlog)

```sql id="4y2q6t"
SHOW VARIABLES LIKE 'log_bin';
```

---

👉 Enabled → MySQL tracks changes

---

---

## 🔹 Example (Concept)

* Day 1 → Full backup
* Day 2 → Incremental (only changes)
* Day 3 → Incremental

👉 Faster + smaller backups

---

---

# 🔸 4. Binary Logs (Important 🔥)

---

## 🔹 What are Binary Logs?

* Record all changes (INSERT, UPDATE, DELETE)

---

## 🔹 View Logs

```bash
mysqlbinlog binlog.000001
```

---

---

## 🔹 Recovery Using Binlog

👉 Restore full backup + replay logs

---

---

# 🔸 5. Backup with Docker 

---

### 📌 Backup

```bash
docker exec mysql_container \
mysqldump -u root -p company_db > backup.sql
```

---

### 📌 Restore

```bash
docker exec -i mysql_container \
mysql -u root -p company_db < backup.sql
```

---

---

# 🔸 6. Scheduled Backups (Automation)

---

## 🔹 Using Cron Job

```bash
0 2 * * * mysqldump -u root -p1234 company_db > /backup/db.sql
```

👉 Runs daily at 2 AM

---

---

# 🔹 Real-World Use Cases

---

### ✅ 1. Production Backup 🔥

* Daily full backup
* Hourly incremental

---

---

### ✅ 2. Disaster Recovery

👉 Server crash → restore backup

---

---

### ✅ 3. Data Migration

```bash
mysqldump old_db > dump.sql
mysql new_db < dump.sql
```

---

---

### ✅ 4. Healthcare System 🔥

👉 Patient data backup critical
👉 Legal compliance (HIPAA-like systems)

---

---

### ✅ 5. Dev/Test Environment

👉 Copy production data to test

---

---

# 🔹 Backup Strategy (Best Practice 🔥)

---

## 🔹 3-2-1 Rule

* 3 copies of data
* 2 different storage types
* 1 offsite backup

---

---

## 🔹 Example Strategy

* Daily full backup
* Hourly incremental
* Weekly offsite backup

---

---

# 🔹 Common Mistakes 🚨

---

### ❌ No backup at all

👉 Biggest mistake

---

### ❌ Backup on same server

👉 Server crash = data loss

---

### ❌ Not testing restore

👉 Backup useless if restore fails

---

---

# 🔹 Performance Tips ⚡

---

✔ Use incremental backup for large DB
✔ Compress backups

```bash
mysqldump db | gzip > backup.sql.gz
```

✔ Backup during low traffic
✔ Monitor backup success

---

---

# 🔹 Mini Practice Task

```bash
# Backup
mysqldump -u root -p test_db > test_backup.sql

# Drop database
DROP DATABASE test_db;

# Restore
mysql -u root -p test_db < test_backup.sql
```

---

## 🔚 Summary

* Backup = data safety
* Types:

  * Full
  * Incremental
  * Differential
* Tools:

  * mysqldump
  * binlog
* Must-have in:

  * Production systems
  * Critical applications
