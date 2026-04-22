# 📊 Cache Key Design Examples

| #  | Use Case                                   | Key Needed            | Why                            |
| -- | ------------------------------------------ | --------------------- | ------------------------------ |
| 1  | Country list                               | Date ❌ (even no date) | Global static data             |
| 2  | Global holiday list (same worldwide)       | Date                  | Changes by date, not country   |
| 3  | Daily exchange rate (global base rate)     | Date                  | Same for all users             |
| 4  | Daily system config (feature flag rollout) | Date                  | Time-based, not location-based |
| 5  | Global leaderboard (daily reset)           | Date                  | Same ranking for all           |
| 6  | Daily report summary (global)              | Date                  | No country variation           |
| 7  | Global maintenance schedule                | Date                  | Same globally                  |
| 8  | App version rollout date                   | Date                  | Not country-specific           |
| 9  | Daily cron-generated stats                 | Date                  | Same for all users             |
| 10 | Global news highlight of the day           | Date                  | Same content worldwide         |

---

| #  | Use Case                               | Key Needed     | Why                             |
| -- | -------------------------------------- | -------------- | ------------------------------- |
| 11 | Product pricing                        | Country + Date | Prices differ per country       |
| 12 | Tax calculation rules                  | Country + Date | Tax laws vary by country        |
| 13 | Currency conversion rates (localized)  | Country + Date | Depends on local currency       |
| 14 | Shipping charges                       | Country + Date | Logistics differ per region     |
| 15 | Discount offers                        | Country + Date | Campaigns differ geographically |
| 16 | Subscription plans                     | Country + Date | Pricing varies by region        |
| 17 | Payment methods availability           | Country + Date | Depends on country regulations  |
| 18 | Content availability (e.g., streaming) | Country + Date | Licensing varies by country     |
| 19 | Language/content localization          | Country + Date | Region-specific content         |
| 20 | Regulatory rules (compliance)          | Country + Date | Laws differ per country         |

---

# 🧠 Pattern You Should Remember

## ✅ Use **Date only** when:

* Data changes over time
* BUT is **same for all users globally**

---

## ✅ Use **Country + Date** when:

* Data changes over time
* AND differs by **location**

---

# ⚡ Quick Decision Rule

```text
Is data same for all users?
  YES → use Date only
  NO  → add country_code
```

---

# 💡 Final Insight

> Don’t add dimensions (like country) unless the business logic demands it—
> every extra dimension increases cache size and complexity.

---

# 🧩 One-Line Summary

> **Cache key = minimum fields required to uniquely identify correct data**

