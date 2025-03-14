import { faker } from '@faker-js/faker';
import * as fs from 'fs';
import * as path from 'path';

// Шлях до файлу userData.json
const filePath = path.resolve(__dirname, './userData.json');

// Функція для запису останнього створеного користувача
export const saveLastRegisteredUser = (user: { login: string; password: string; firstName: string; lastName: string }) => {
    fs.writeFileSync(filePath, JSON.stringify(user, null, 2)); // Перезаписуємо файл з новими даними
};

// Функція для отримання останнього зареєстрованого користувача
export const getLastRegisteredUser = (): { login: string; password: string; firstName: string; lastName: string } | null => {
    if (!fs.existsSync(filePath)) {
        return null; // Якщо файл не існує, повертаємо null
    }
    const fileData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileData); // Повертаємо об'єкт користувача
};

// Генерація та збереження логіна
export const generateAndStoreValidLogin = (): string => faker.string.alphanumeric(8); // Генеруємо випадковий алфавітно-цифровий логін

// Генерація та збереження пароля
export const generateAndStoreValidPassword = (): string => {
    const passwordLength = 8;
    return faker.internet.password({
        length: passwordLength,
        memorable: false,
        pattern: /[a-zA-Z0-9!@#$%^&*()]/,
    }) + '1!Serg'; // Ускладнюємо пароль
};

// Генерація випадкового імені
export const generateValidFirstName = (): string => faker.person.firstName(); // Використовуємо faker для імені

// Генерація випадкового прізвища
export const generateValidLastName = (): string => faker.person.lastName(); // Використовуємо faker для прізвища
