# Automated Testing Project with Playwright and TypeScript

## Project Overview
This project is designed to automate the testing of web applications using modern tools and technologies. It focuses on user registration, login, and validation of page functionality. The project integrates advanced reporting and continuous integration workflows to enhance transparency and efficiency in the testing process.

---

## Technologies Used
### Core Stack:
- **[Playwright](https://playwright.dev/):** A cutting-edge tool for browser automation, enabling cross-browser testing.
- **TypeScript:** Provides strong typing and improved code safety for test scripts.
- **[Faker](https://fakerjs.dev/):** A library for generating realistic random data (logins, passwords, names, etc.).
- **JSON File:** Used to store data for successfully registered users, allowing these details to be reused in subsequent tests (e.g., for login).

### Reporting:
- **Allure Report:** Generates comprehensive and insightful reports on test execution.

### CI/CD:
- **GitHub Actions:** Automates the generation and deployment of Allure Reports.

---

## Key Features
1. **User Registration:**
   - Generates user credentials (login, password, first name, last name) using `Faker`.
   - Stores details of the last successfully registered user in `userData.json` to avoid redundancy.
   - Ensures seamless integration between registration and subsequent tests.

2. **User Login:**
   - Uses stored credentials from `userData.json` to validate the login process.

3. **Form Validation:**
   - Validates form fields such as login, name, surname, and password.
   - Handles common errors like empty fields and password mismatches.

4. **Test Reporting:**
   - Leverages Allure Reports to provide detailed and user-friendly test results.
   - Allows easy tracking and analysis of test executions.

---

## CI/CD with GitHub Actions
This project uses GitHub Actions to automatically generate and deploy Allure Reports. The following configuration is used:

```yaml
name: allure-report

on:
  release:
    types:
      - created
  push:
    branches-ignore:
      - '!master'

jobs:
  allure:
    name: Generate Allure Report
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Get Allure history
        uses: actions/checkout@v2
        if: always()
        continue-on-error: true
        with:
          ref: gh-pages
          path: gh-pages

      - name: Allure Report action from marketplace
        uses: simple-elf/allure-report-action@master
        if: always()
        with:
          allure_results: allure-results
          allure_history: allure-history
          keep_reports: 20

      - name: Deploy report to Github Pages
        if: always()
        uses: peaceiris/actions-gh-pages@v2
        env:
          PERSONAL_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          PUBLISH_BRANCH: gh-pages
          PUBLISH_DIR: allure-history

 ## Functionality

    Automatically generates Allure Reports after test execution.

    Publishes these reports to GitHub Pages, enabling easy access and visualization.

    Maintains report history using allure-history

    ## Allure Report

The test execution results are published on GitHub Pages for convenient access.

How to Run the Project Locally

    Clone the repository:
    bash
    git clone <repository-url>
cd <project-folder>

Install dependencies:
npm install

Run tests:
npx playwright test

Generate Allure Report locally:
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report

Project Structure
project/
├── tests/                  # Test files
├── utils/                  # Utility functions for data generation and storage
│   ├── dataGenerators.ts   # Handles data generation and JSON operations
│   ├── userData.json       # Stores the last registered user's details
├── allure-results/         # Stores test execution results for Allure
├── allure-report/          # Generated Allure Reports
├── .github/workflows/      # GitHub Actions configurations
└── README.md               # Project documentation
