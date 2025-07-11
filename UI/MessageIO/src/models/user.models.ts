export interface User {
    id: string,
    username: string,
    email: string,
    firstName: string,
    lastName: string | null,
    passwordHash: string,
    createdAt: string,
}