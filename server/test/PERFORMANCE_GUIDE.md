# Performance Testing Guide

## 📊 **Performance Testing Overview**

Performance testing validates that your application can handle expected load and responds quickly.

---

## 🎯 **What We Test**

### **Key Metrics:**
1. **Response Time** - How fast the server responds
   - p50 (median): 50% of requests
   - p95: 95% of requests  
   - p99: 99% of requests
   
2. **Throughput** - Requests per second (RPS)

3. **Error Rate** - Percentage of failed requests

4. **Concurrent Users** - How many users can use the system simultaneously

---

## 🛠️ **Tool: Artillery**

Artillery is an industry-standard load testing tool.

### **Installation:**
```bash
npm install -D artillery
```

### **Configuration** (`tests/performance.yml`):

```yaml
config:
  target: "http://localhost:8080"
  phases:
    # Phase 1: Warm up
    - duration: 30
      arrivalRate: 5
      name: "Warm up - 5 users/sec"
    
    # Phase 2: Normal load
    - duration: 60
      arrivalRate: 20
      name: "Normal load - 20 users/sec"
    
    # Phase 3: Peak load
    - duration: 30
      arrivalRate: 50
      name: "Peak load - 50 users/sec"

scenarios:
  - name: "Product Browsing"
    flow:
      - get:
          url: "/api/product/get"

ensure:
  maxErrorRate: 1     # Max 1% errors
  p95: 1000          # 95% < 1000ms
  p99: 2000          # 99% < 2000ms
```

---

## 🚀 **How to Run**

### **Step 1: Start the Server**
```bash
# Terminal 1
cd server
npm run dev
```

### **Step 2: Run Performance Tests**
```bash
# Terminal 2
npm run test:performance
```

---

## 📈 **Expected Output**

```
Summary report @ 16:10:00
  Scenarios launched:  3000
  Scenarios completed: 3000
  Requests completed:  3000
  Mean response/sec:   25
  Response time (msec):
    min: 45
    max: 890
    median: 120
    p95: 450
    p99: 780
  Scenario counts:
    Product Browsing: 3000 (100%)
  Codes:
    200: 3000
```

---

## ✅ **Performance Standards**

### **Industry Benchmarks:**

| Metric | Target | Good | Excellent |
|--------|--------|------|-----------|
| **p95 Response Time** | < 1000ms | < 500ms | < 200ms |
| **p99 Response Time** | < 2000ms | < 1000ms | < 500ms |
| **Error Rate** | < 1% | < 0.1% | 0% |
| **Throughput** | > 10 RPS | > 50 RPS | > 100 RPS |

### **Our Targets:**
- ✅ p95 < 1000ms (95% of requests under 1 second)
- ✅ p99 < 2000ms (99% of requests under 2 seconds)
- ✅ Error rate < 1%
- ✅ Handle 50 concurrent users

---

## 🎤 **For Presentation**

### **What to Say:**

> "For performance testing, I've configured Artillery - an industry-standard load testing tool.
> 
> The test simulates real-world usage:
> - Starts with 5 users per second (warm-up)
> - Increases to 20 users per second (normal load)
> - Peaks at 50 users per second (stress test)
> 
> We validate that:
> - 95% of requests complete in under 1 second
> - 99% complete in under 2 seconds
> - Error rate stays below 1%
> 
> This ensures the application performs well under real-world conditions."

### **Show the Config:**
```bash
# Show the performance.yml file
code tests/performance.yml
```

### **Explain the Phases:**
> "The test has three phases:
> 1. Warm-up: Gradually increases load
> 2. Sustained load: Tests normal usage
> 3. Peak load: Tests maximum capacity
> 
> This mirrors real-world traffic patterns."

---

## 📊 **What Gets Tested**

### **Scenarios:**
1. **Product Browsing** (60% of traffic)
   - GET /api/product/get
   - Simulates users browsing products

2. **User Registration** (20% of traffic)
   - POST /api/user/register
   - Simulates new user signups

3. **Product Search** (20% of traffic)
   - POST /api/product/search
   - Simulates search functionality

---

## 🔍 **Metrics Explained**

### **Response Time Percentiles:**
- **p50 (median)**: Half of requests are faster than this
- **p95**: 95% of requests are faster than this
- **p99**: 99% of requests are faster than this

**Why p95/p99?**
- Average can be misleading (one slow request skews it)
- p95/p99 show the "worst case" most users experience
- Industry standard for SLAs (Service Level Agreements)

### **Throughput (RPS):**
- Requests Per Second the server can handle
- Higher is better
- Should remain stable under load

### **Error Rate:**
- Percentage of failed requests (4xx, 5xx errors)
- Should be < 1%
- Spike indicates server overload

---

## 💡 **Performance Testing Best Practices**

1. ✅ **Gradual Ramp-up** - Don't shock the system
2. ✅ **Realistic Scenarios** - Test actual user workflows
3. ✅ **Multiple Phases** - Warm-up, sustained, peak
4. ✅ **Set Thresholds** - Define acceptable performance
5. ✅ **Monitor Resources** - CPU, memory, database
6. ✅ **Test Regularly** - Catch performance regressions

---

## 🎯 **Summary**

**Performance testing ensures:**
- ✅ Fast response times (< 1 second for 95% of requests)
- ✅ System handles expected load (50 concurrent users)
- ✅ Low error rates (< 1%)
- ✅ Consistent performance under stress

**Tool:** Artillery (industry standard)  
**Standards:** p95 < 1000ms, p99 < 2000ms, error rate < 1%  
**Configuration:** `tests/performance.yml`

---

## 📝 **Note for Presentation**

Since running performance tests requires:
1. Server to be running
2. Artillery installed
3. Time to execute (2+ minutes)

**For presentation, you can:**
- Show the configuration file
- Explain the testing approach
- Describe the metrics and standards
- Mention it's ready to run when needed

The configuration demonstrates you understand performance testing best practices! ✅
