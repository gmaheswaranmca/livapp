Today, let's understand another programming concept:

*🔥 Greedy Algorithms🧠💻*

Greedy Algorithm is one of the most important problem-solving approaches asked in coding interviews.

*📌 What is a Greedy Algorithm?*

A Greedy Algorithm makes the best possible choice at each step with the hope of getting the overall optimal solution.

👉 It focuses on local optimum → hoping for global optimum

*🧠 Key Idea*

At every step:
- pick the best option available right now
- don’t reconsider past decisions

*⚡ When Greedy Works*

Greedy works when a problem has:

1️⃣ *Greedy Choice Property*
Choosing the best local option leads to global optimum

2️⃣ *Optimal Substructure*
Problem can be broken into smaller optimal parts

*🔍 Example Concept*

Imagine you want to make ₹70 using coins:
Coins =[1][2][5][10][20][50]

Greedy approach:
- pick 50 → remaining 20
- pick 20 → done

👉 Fast and optimal

*🧠 Common Greedy Problems*

*1️⃣ Activity Selection Problem*
Select maximum non-overlapping activities
👉 Choose activity with earliest finish time

*2️⃣ Coin Change (Greedy version)*
Use largest denomination first
👉 Works for standard currency systems

*3️⃣ Fractional Knapsack*
Take items with highest value/weight ratio
👉 Can take fractions of items

*4️⃣ Job Scheduling*
Maximize profit with deadlines

*5️⃣ Minimum Platforms*
Find minimum platforms needed for trains

*⚠️ Greedy vs Dynamic Programming*

*Greedy:*
- Faster
- Simpler
- Doesn’t guarantee correct answer always

*DP:*
- Slower
- More accurate
- Considers all possibilities

*🎯 How to Identify Greedy Problems*

Look for:
- “Maximum” or “Minimum” optimization
- Sorted or priority-based decisions
- No need to revisit decisions

*⚠️ Common Mistakes*

❌ Using greedy where DP is required
❌ Not proving greedy choice is valid
❌ Ignoring edge cases

*⭐ Interview Insight*

Interviewers test:
- Can you justify greedy choice?
- Can you compare with DP?
- Do you understand when greedy fails?

*💡 Key Thought Process*

Ask:
👉 “Can I make the best choice at each step without affecting final result?”

If YES → Greedy works
