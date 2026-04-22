# 🗄️ Database Tables

| Table Name          | Fields (comma separated)                                                                                                 | Enum Fields                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| users               | id, username, email, phone, password_hash, role_id, is_active, created_at                                                | is_active (true, false)                                        |
| roles               | id, role_name                                                                                                            | role_name (SuperAdmin, Admin, SuperClient, SubClient, Student) |
| clients             | id, name, type, parent_client_id, created_by, created_at                                                                 | type (SuperClient, SubClient)                                  |
| students            | id, user_id, full_name, usn, email, phone, client_id, created_at                                                         | —                                                              |
| trainers            | id, name, email, phone, specialization, created_at                                                                       | —                                                              |
| trainings           | id, trainer_id, client_id, topic, batch_name, start_date, end_date                                                       | —                                                              |
| assessments         | id, training_id, title, duration_minutes, total_marks, negative_marking, created_at                                      | negative_marking (true, false)                                 |
| questions           | id, assessment_id, question_text, question_type, marks, negative_marks                                                   | question_type (MCQ, Coding)                                    |
| options             | id, question_id, option_text, is_correct                                                                                 | is_correct (true, false)                                       |
| student_assessments | id, student_id, assessment_id, started_at, submitted_at, score, status                                                   | status (Started, Completed)                                    |
| student_answers     | id, student_assessment_id, question_id, selected_option_id, answer_text, is_correct, marks_awarded, is_marked_for_review | is_correct (true, false); is_marked_for_review (true, false)   |
| feedbacks           | id, student_id, training_id, trainer_id, submitted_at                                                                    | —                                                              |
| feedback_responses  | id, feedback_id, question, answer                                                                                        | —                                                              |
| login_logs          | id, user_id, login_time, ip_address, status                                                                              | status (Success, Failed)                                       |
| page_views          | id, user_id, page_name, viewed_at                                                                                        | —                                                              |
| otp_verifications   | id, user_id, otp_code, expires_at, is_used                                                                               | is_used (true, false)                                          |
| reports             | id, type, generated_by, file_url, created_at                                                                             | type (Assessment, Feedback)                                    |

---

# ✅ Notes

* “—” means no enum fields in that table
* Multiple enums in one table are separated by `;`
* Structure is ready for direct **DB design / API mapping**

