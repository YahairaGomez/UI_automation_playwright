
# Web Automation Challenge

This project contains UI automation tests using Playwright for the **SauceDemo** website, following the requirements of the assignment. The tests are structured into various folders for better organization:

- **validCases**: Contains tests for the main use cases (Assignment 1 - happy path).
- **edgeCases**: Contains tests for edge cases, such as invalid credentials or blank data.
- **a11y**: Contains accessibility tests (Assignment 2).

The goal is to simulate real-world user actions and validate that the application behaves as expected.

## Prerequisites

Before running the tests, ensure you have the following installed:

- **Node.js** (>= v16.0.0)
- **npm** (>= v7.0.0)

You can download Node.js from [here](https://nodejs.org/).

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/saucedemo-automation.git
cd saucedemo-automation
```

### 2. Install dependencies

Run the following command to install the required dependencies:

```bash
npm ci
```

### 3. Install Playwright Browsers

Install the necessary Playwright browsers:

```bash
npx playwright install --with-deps
```

## Running the Tests

The test suite is divided into different sets, and you can run them independently or all together. Use the following commands to run the tests:

### Run Valid Tests (Assignment 1)

These tests simulate a successful login, adding/removing items from the cart, completing a checkout, and verifying product cards.

```bash
npm run assignment1-validCases-chromium
```

### Run Edge Cases (Assignment 1)

This set of tests evaluates edge cases like blank form data or incorrect login credentials.

```bash
npm run assignment1-edgeCases-chromium
```

### Run Accessibility Tests (Assignment 2)

These tests verify accessibility features such as alt attributes for images, focus visibility on interactive elements, and label associations for form inputs.

```bash
npm run assignment2-a11yCases-chromium
```

### Run All Tests (Assignments 1 and 2)

To run all the tests (both assignments 1 and 2), use this command:

```bash
npm run assignment-1-2-chromium
```

## GitHub Actions

The repository is set up with GitHub Actions to automatically run the Playwright tests upon push or pull request. It will execute the following steps:

1. Install dependencies
2. Install Playwright browsers
3. Run the tests for Assignment 1 (valid cases and edge cases)
4. Run accessibility tests for Assignment 2

## File Structure

- **tests/**
  - **validCases/**: Contains the happy path tests for Assignment 1.
  - **edgeCases/**: Contains edge case tests for Assignment 1 (e.g., invalid login credentials, blank data).
  - **a11y/**: Contains accessibility tests for Assignment 2.
- **package.json**: Contains the scripts for running various test sets.
- **.env**: Environment variables file for storing credentials securely.

## Custom Scripts

Here are the scripts available in the `package.json` for running different tests:

- `assignment1-edgeCases-chromium`: Run edge cases tests for Assignment 1.
- `assignment1-validCases-chromium`: Run valid tests for Assignment 1.
- `assignment2-a11yCases-chromium`: Run accessibility tests for Assignment 2.
- `assignment-1-2-chromium`: Run both Assignment 1 and 2 tests.

