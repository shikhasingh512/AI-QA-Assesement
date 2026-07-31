# QA planning assessment
_Exported on 31/07/2026 at 17:29:28 GMT+5:30 from Cursor (3.13.25)_

---


**User**

Step 1: Design Manual Functional Test Cases
Prompt 1:
Act as a Senior QA Engineer. Generate a set of 6 concise manual test cases for the Toolshop application covering Registration, Login, Product Search, Cart Updates, COD Checkout, and Invoice Verification.
Include explicit handling for the UI constraint: Confirm button must be clicked twice during checkout to generate the invoice ID.
Output fields for each case: Test ID, Title, Module, Preconditions, Step-by-step Action, Expected Result, Scope (@Smoke/@Regression), and Type (Positive/Negative/Edge).


---

**Cursor**

> Auto routed to grok-4.5



I'll draft 6 manual test cases aligned with the RTM, including the double-Confirm checkout constraint, and save them under `ai-prompts`.

Saved to `AI-Prompt/ai-prompts/manual-functional-test-cases.md`. Six cases below; TC-05/TC-06 encode the **Confirm × 2** invoice-ID constraint.

| Test ID | Title | Module | Scope | Type |
|---------|-------|--------|-------|------|
| TC-01 | Register new customer with valid unique data | Registration | `@Smoke` `@Regression` | Positive |
| TC-02 | Login with valid credentials establishes session | Login | `@Smoke` `@Regression` | Positive |
| TC-03 | Search returns matching products by keyword | Product Search | `@Smoke` `@Regression` | Positive |
| TC-04 | Update cart quantity recalculates line total | Cart Updates | `@Smoke` `@Regression` | Positive |
| TC-05 | COD checkout requires Confirm clicked twice | COD Checkout | `@Smoke` `@Regression` | Positive |
| TC-06 | Invoice ID visible after double Confirm and listed in account | Invoice Verification | `@Smoke` `@Regression` | Positive |

### TC-01 — Registration
- **Preconditions:** Unique email not registered  
- **Actions:** Register → fill valid profile/address → strong password → submit  
- **Expected:** Account created; can log in; no validation errors  

### TC-02 — Login
- **Preconditions:** Existing user (TC-01 or seeded customer)  
- **Actions:** Sign in → valid credentials → open account/profile  
- **Expected:** Authenticated session; correct name/email shown  

### TC-03 — Product Search
- **Preconditions:** Catalog loaded  
- **Actions:** Search known keyword (e.g. `hammer`) → open a result  
- **Expected:** Matching products listed; PDP name/price/stock consistent  

### TC-04 — Cart Updates
- **Preconditions:** In-stock product available  
- **Actions:** Add qty 1 → cart → update qty to 2  
- **Expected:** Line total = price × 2; badge/count updated  

### TC-05 — COD Checkout (double Confirm)
- **Preconditions:** Logged in; cart has item; valid billing address  
- **Actions:** Checkout → COD → **Confirm once** → assert no invoice ID → **Confirm second time**  
- **Expected:** 1st Confirm: no invoice ID; 2nd Confirm: payment success + **invoice ID generated**  

### TC-06 — Invoice Verification
- **Preconditions:** Same as TC-05  
- **Actions:** COD checkout with Confirm × 2 → capture invoice ID → Account → Invoices → open/PDF  
- **Expected:** Invoice ID only after 2nd Confirm; same number in account invoices; PDF when ready

---

**User**

Step 2: Edge Cases & Negative Scenarios
Prompt 2:
Generate 2 high-risk negative/edge scenarios:
API checkout payload missing required fields (cart_id or billing_street).
Cart quantity manipulation boundary test (updating item count to 0 or negative values).


---

**Cursor**

> Auto routed to grok-4.5



I'll add two high-risk negative/edge cases to the manual test cases file, using the same field format as Step 1.

Appended **Step 2** to `AI-Prompt/ai-prompts/manual-functional-test-cases.md` as **TC-07** and **TC-08**.

### TC-07 — API checkout missing required fields (`Negative` · `@Regression`)
- **Module:** COD Checkout (API)  
- **Action:** Authenticated `POST /invoices` omitting `cart_id` (Variant A), then omitting `billing_street` (Variant B); optional empty-string retries  
- **Expected:** 4xx/422 with field errors; **no** invoice created; cart uncleared  

### TC-08 — Cart quantity 0 / negative (`Negative`/`Edge` · `@Regression`)
- **Module:** Cart Updates (UI + API)  
- **Action:** `PUT .../product/quantity` with `0` and `-1` (optional `-999`); mirror on UI quantity control; re-GET cart  
- **Expected:** Rejected or clean line removal — **never** negative qty/totals; cart stays consistent; invalid cart cannot checkout

---

**User**

Step 3: Export to CSV
Prompt 3:
Convert all 8 generated manual test cases into a clean CSV format with headers:
Test ID, Title, Module, Priority, Scope, Type, Steps, Expected Result, Status
Save the result to FunctionalTestCase/FunctionalTestCase.csv. Ensure the default status for each row is set to Passed.


---

**Cursor**

> Auto routed to grok-4.5



I'll convert all 8 test cases into CSV with Status=Passed and save them under `FunctionalTestCase/FunctionalTestCase.csv`.

Exported all 8 cases to `AI-Prompt/FunctionalTestCase/FunctionalTestCase.csv` (also mirrored at workspace `FunctionalTestCase/FunctionalTestCase.csv`).

| Field | Value |
|-------|--------|
| Headers | `Test ID, Title, Module, Priority, Scope, Type, Steps, Expected Result, Status` |
| Rows | TC-01 … TC-08 |
| Status | `Passed` (all rows) |
| Priority | TC-01–06 → `P0`; TC-07–08 → `P1` |

