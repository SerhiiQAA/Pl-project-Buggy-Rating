import { faker } from '@faker-js/faker';
import * as fs from 'fs';
import * as path from 'path';

const filePath = path.resolve(__dirname, './userData.json');
export const saveLastRegisteredUser = (user: { login: string; password: string; firstName: string; lastName: string }) => {
    fs.writeFileSync(filePath, JSON.stringify(user, null, 2)); 
};

export const getLastRegisteredUser = (): { login: string; password: string; firstName: string; lastName: string } | null => {
    if (!fs.existsSync(filePath)) {
        return null; 
    }
    const fileData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileData); 
};

export const generateAndStoreValidLogin = (): string => faker.string.alphanumeric(8); 
export const generateAndStoreValidPassword = (): string => {
    const passwordLength = 8;
    return faker.internet.password({
        length: passwordLength,
        memorable: false,
        pattern: /[a-zA-Z0-9!@#$%^&*()]/,
    }) + '1!Serg'; 
};

export const generateValidFirstName = (): string => faker.person.firstName(); 
export const generateValidLastName = (): string => faker.person.lastName(); 
