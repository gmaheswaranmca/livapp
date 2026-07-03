## String Operations Comparison

> The table uses the **standard mutable/immutable string type** most commonly used in competitive programming for each language.

| Operation           | C++                          | Rust                             | Go                           | Java                             | Python               | JavaScript                       | C#                                  |
| ------------------- | ---------------------------- | -------------------------------- | ---------------------------- | -------------------------------- | -------------------- | -------------------------------- | ----------------------------------- |
| **Data Structure**  | `string`                     | `String`                         | `string`                     | `String`                         | `str`                | `String`                         | `string`                            |
| **Import**          | `#include <string>`          | None                             | None                         | None                             | None                 | None                             | None                                |
| **Instantiation**   | `string s="abc";`            | `let mut s=String::from("abc");` | `s:="abc"`                   | `String s="abc";`                | `s="abc"`            | `let s="abc";`                   | `string s="abc";`                   |
| **Length**          | `s.size()`                   | `s.len()`                        | `len(s)`                     | `s.length()`                     | `len(s)`             | `s.length`                       | `s.Length`                          |
| **Empty**           | `s.empty()`                  | `s.is_empty()`                   | `len(s)==0`                  | `s.isEmpty()`                    | `len(s)==0`          | `s.length===0`                   | `s.Length==0`                       |
| **Access**          | `s[i]`                       | `s.chars().nth(i)`*              | `s[i]`**                     | `s.charAt(i)`                    | `s[i]`               | `s[i]`                           | `s[i]`                              |
| **Update Char**     | `s[i]='x'`                   | Convert to `Vec<char>`           | Convert to `[]byte`/`[]rune` | Convert to `char[]`              | Not allowed          | Not allowed                      | Convert to `char[]`                 |
| **Append Char**     | `s+='a'`                     | `s.push('a')`                    | `s+="a"`                     | `s+='a'`                         | `s+='a'`             | `s+='a'`                         | `s+='a'`                            |
| **Append String**   | `s+=t`                       | `s.push_str(&t)`                 | `s+=t`                       | `s+=t`                           | `s+=t`               | `s+=t`                           | `s+=t`                              |
| **Insert**          | `s.insert(i,'x')`            | `s.insert(i,'x')`***             | Build new string             | Use `StringBuilder`              | `s=s[:i]+'x'+s[i:]`  | `s=s.slice(0,i)+'x'+s.slice(i)`  | Use `StringBuilder`                 |
| **Erase**           | `s.erase(i,1)`               | `s.remove(i)`***                 | Build new string             | Use `StringBuilder`              | `s=s[:i]+s[i+1:]`    | `s=s.slice(0,i)+s.slice(i+1)`    | Use `StringBuilder`                 |
| **Substring**       | `s.substr(i,n)`              | `&s[i..j]`***                    | `s[i:j]`**                   | `s.substring(i,j)`               | `s[i:j]`             | `s.slice(i,j)`                   | `s.Substring(i,n)`                  |
| **Find**            | `s.find("ab")`               | `s.find("ab")`                   | `strings.Index(s,"ab")`      | `s.indexOf("ab")`                | `s.find("ab")`       | `s.indexOf("ab")`                | `s.IndexOf("ab")`                   |
| **Contains**        | `s.find(x)!=string::npos`    | `s.contains(x)`                  | `strings.Contains(s,x)`      | `s.contains(x)`                  | `x in s`             | `s.includes(x)`                  | `s.Contains(x)`                     |
| **Starts With**     | `s.starts_with()` (C++20)    | `s.starts_with()`                | `strings.HasPrefix()`        | `s.startsWith()`                 | `s.startswith()`     | `s.startsWith()`                 | `s.StartsWith()`                    |
| **Ends With**       | `s.ends_with()` (C++20)      | `s.ends_with()`                  | `strings.HasSuffix()`        | `s.endsWith()`                   | `s.endswith()`       | `s.endsWith()`                   | `s.EndsWith()`                      |
| **Split**           | `stringstream`               | `s.split()`                      | `strings.Split()`            | `s.split()`                      | `s.split()`          | `s.split()`                      | `s.Split()`                         |
| **Join**            | Loop / `ostringstream`       | `v.join("")`****                 | `strings.Join()`             | `String.join()`                  | `" ".join(list)`     | `arr.join(" ")`                  | `string.Join()`                     |
| **Reverse**         | `reverse(s.begin(),s.end())` | `s.chars().rev().collect()`      | Reverse `[]byte`/`[]rune`    | `new StringBuilder(s).reverse()` | `s[::-1]`            | `s.split('').reverse().join('')` | `new string(s.Reverse().ToArray())` |
| **Sort Characters** | `sort(s.begin(),s.end())`    | Sort `Vec<char>`                 | Sort `[]byte`                | Sort `char[]`                    | `"".join(sorted(s))` | `s.split('').sort().join('')`    | Sort `char[]`                       |
| **Clear**           | `s.clear()`                  | `s.clear()`                      | `s=""`                       | `s=""`                           | `s=""`               | `s=""`                           | `s=""`                              |

### Notes

* **C++**

  * `std::string` is mutable.
  * Character access is **O(1)**.

* **Rust**

  * `String` stores UTF-8, so direct indexing (`s[i]`) is **not allowed**.
  * `chars().nth(i)` is **O(n)**.
  * `insert`, `remove`, and slicing require **valid UTF-8 byte boundaries**.

* **Go**

  * Strings are immutable.
  * `s[i]` returns a **byte**, not necessarily a Unicode character.
  * Convert to `[]rune` for Unicode-safe indexing and updates.

* **Java**

  * `String` is immutable.
  * For frequent modifications, use `StringBuilder`.

* **Python**

  * Strings are immutable.
  * Build new strings using slicing or use a list for many edits.

* **JavaScript**

  * Strings are immutable.
  * Methods like `slice()` and concatenation create new strings.

* **C#**

  * `string` is immutable.
  * Use `StringBuilder` for repeated insertions, deletions, or updates.

### Competitive Programming Tips

* **C++:** `string`
* **Rust:** `String` (or `Vec<char>` if many character updates are needed)
* **Go:** `string` / `[]byte` / `[]rune` depending on whether Unicode support is needed
* **Java:** `String` for reading, `StringBuilder` for modifications
* **Python:** `str`
* **JavaScript:** `String`
* **C#:** `string` for reading, `StringBuilder` for heavy modifications
