# API Documentation

This document outlines the available API endpoints for the backend. Each endpoint is listed with its route and description.

## Authentication APIs

### Sign Up

**POST** `/sign-up`

- Description: Endpoint for user or doctor sign-up.
- Controller: `signUpController`

### Sign In

**POST** `/sign-in`

- Description: Endpoint for user or doctor sign-in.
- Controller: `signInController`

---

## User APIs

### Get Transaction History

**GET** `/transaction-history`

- Description: Fetches the transaction history for a user.
- Controller: `getTransactionHistoryController`

### Get All Slots for a Doctor

**GET** `/:doctorid`

- Description: Retrieves all available slots for a specific doctor.
- Controller: `getDoctorSlotsController`

### Book a Slot

**POST** `/book-slot`

- Description: Books a slot for a specific doctor.
- Controller: `bookSlotController`

### Get Discount for a Doctor

**GET** `/get-discount/:doctorid`

- Description: Retrieves the discount details for a specific doctor.
- Controller: `getDiscountController`

---

## Doctor APIs

### Get Current Appointments

**GET** `/current-appointments`

- Description: Fetches all current appointments for a doctor.
- Controller: `getCurrentAppointmentsController`

### Get Appointment History

**GET** `/appointments-history`

- Description: Fetches the appointment history with an option to download as a file.
- Controller: `getAppointmentsHistoryController`

### Get Transaction History

**GET** `/transaction-history`

- Description: Retrieves the transaction history for a doctor.
- Controller: `getTransactionHistoryController`

---

## Payment APIs

### Payment Verification

**POST** `/verification`

- Description: Verifies the payment details.
- Controller: `paymentVerificationController`

---

This documentation provides an overview of the available APIs to facilitate integration and usage.
