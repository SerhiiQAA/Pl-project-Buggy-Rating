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
This project uses GitHub Actions to automatically generate and deploy Allure Reports. 

## Functionality
- Automatically generates Allure Reports after test execution.
- Publishes these reports to GitHub Pages, enabling easy access and visualization.
- Maintains report history using allure-history.

## Allure Report
The test execution results are published on GitHub Pages for convenient access. 

## How to Run the Project Locally

Follow these steps to set up and run the project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <project-folder>

2. **Install dependencies:**
    ```bash
    npm install

3. **Run tests:**
    To run tests in headless mode (default):
    ```bash
    npm test
    ```
    To run tests in visible mode:
    ```bash
    npm run test:headed
    ```
    
4. **Generate Allure Report locally:**
    ```bash
    npm run report:generate

5. **Open Allure Report locally:**
    ```bash
    npm run report:open

6. **Running Tests with Report Generation:**
    Running Tests with Report:
    ```bash
    npm run test:report
    ```
## GitHub Actions

The project uses GitHub Actions for CI/CD. The pipeline is defined in the `playwright.yml` file. The steps include:

1. **Install dependencies**
2. **Run tests**
3. **Copy Allure results**
4. **Generate Allure report**
5. **Deploy report to GitHub Pages**