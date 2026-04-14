# Applying **SOLID principles** using an **Order Management System (Order, Customer, Product)** 

---

## 🧠 SOLID Principles – Order Management System Notes

### 📌 Domain Model (Base Design)

We start with 3 core entities:

```csharp
class Customer
{
    public int Id { get; set; }
    public string Name { get; set; }
}

class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public double Price { get; set; }
}

class Order
{
    public int Id { get; set; }
    public Customer Customer { get; set; }
    public List<Product> Products { get; set; }
}
```

---

## 🔴 1. Single Responsibility Principle (SRP)

👉 **Definition**: A class should have only ONE reason to change.

### ❌ Bad Design

```csharp
class OrderService
{
    public void CreateOrder(Order order) { }

    public void SaveToDatabase(Order order) { }

    public void SendEmail(Order order) { }
}
```

🚨 Problems:

* Business logic + DB + Email → tightly coupled
* Hard to maintain and test

### ✅ Good Design

```csharp
class OrderService
{
    public void CreateOrder(Order order) { }
}

class OrderRepository
{
    public void Save(Order order) { }
}

class EmailService
{
    public void SendOrderConfirmation(Order order) { }
}
```

✅ Benefits:

* Each class has **one responsibility**
* Easy to test and modify

---

## 🟠 2. Open/Closed Principle (OCP)

👉 **Definition**: Open for extension, closed for modification

### ❌ Bad Design

```csharp
class DiscountService
{
    public double CalculateDiscount(string customerType)
    {
        if (customerType == "Regular") return 5;
        else if (customerType == "Premium") return 10;
        return 0;
    }
}
```

🚨 Problem:

* Adding new types → modify existing code

### ✅ Good Design

```csharp
interface IDiscount
{
    double GetDiscount();
}

class RegularDiscount : IDiscount
{
    public double GetDiscount() => 5;
}

class PremiumDiscount : IDiscount
{
    public double GetDiscount() => 10;
}
```

```csharp
class DiscountService
{
    public double Calculate(IDiscount discount)
    {
        return discount.GetDiscount();
    }
}
```

✅ Add new discount → create new class, no modification

---

## 🟡 3. Liskov Substitution Principle (LSP)

👉 **Definition**: Child classes should replace parent without breaking behavior

### ❌ Bad Design

```csharp
class Product
{
    public virtual double GetPrice() => 100;
}

class FreeProduct : Product
{
    public override double GetPrice()
    {
        throw new Exception("No price");
    }
}
```

🚨 Problem:

* Substituting `FreeProduct` breaks logic

### ✅ Good Design

```csharp
abstract class Product
{
    public abstract double GetPrice();
}

class PaidProduct : Product
{
    public override double GetPrice() => 100;
}

class FreeProduct : Product
{
    public override double GetPrice() => 0;
}
```

✅ Consistent behavior

---

## 🟢 4. Interface Segregation Principle (ISP)

👉 **Definition**: Don't force classes to implement unused methods

### ❌ Bad Design

```csharp
interface IOrderService
{
    void CreateOrder();
    void CancelOrder();
    void GenerateInvoice();
}
```

🚨 Problem:

* Some classes may not need all methods

### ✅ Good Design

```csharp
interface ICreateOrder
{
    void CreateOrder();
}

interface ICancelOrder
{
    void CancelOrder();
}

interface IInvoice
{
    void GenerateInvoice();
}
```

✅ Classes implement only what they need

---

## 🔵 5. Dependency Inversion Principle (DIP)

👉 **Definition**: Depend on abstractions, not concrete classes
* Low Level Module (EmailService) and High Level Module (OrderService) should not depend on each other. 
* They should depend on abstractions (INotificationService).

### ❌ Bad Design

```csharp
class OrderService
{
    private EmailService emailService = new EmailService();

    public void PlaceOrder(Order order)
    {
        emailService.SendOrderConfirmation(order);
    }
}
```

🚨 Problem:

* Tight coupling with EmailService

### ✅ Good Design

```csharp
interface INotificationService
{
    void Send(Order order);
}

class EmailService : INotificationService
{
    public void Send(Order order)
    {
        Console.WriteLine("Email sent");
    }
}
```

```csharp
class OrderService
{
    private readonly INotificationService notificationService;

    public OrderService(INotificationService notificationService)
    {
        this.notificationService = notificationService;
    }

    public void PlaceOrder(Order order)
    {
        notificationService.Send(order);
    }
}
```

✅ Easily switch to SMS / WhatsApp

---

## 🏗️ Final Architecture (Corporate Level)

#### Layers:

* **Entities** → Customer, Product, Order
* **Interfaces** → IDiscount, INotificationService
* **Services** → OrderService, DiscountService
* **Repositories** → OrderRepository
* **External Services** → Email, SMS, WhatsApp

---

## 🔥 Real-Time Flow (Putting It All Together)

```text
Controller
   ↓
OrderService
   ↓
DiscountService (OCP)
   ↓
OrderRepository (SRP)
   ↓
NotificationService (DIP)
```

---

## 🎯 Interview + Learning Key Points

* SRP → separation of concerns
* OCP → strategy pattern usage
* LSP → behavioral correctness
* ISP → smaller interfaces
* DIP → dependency injection

---

## 💡 Tips (Very Important)

* Start with **bad design → refactor to SOLID**
* Use **real examples (Order, Payment, Shipping)**
* Map:
  * OCP → Strategy Pattern
  * DIP → Dependency Injection
* Show **unit testing benefits**


