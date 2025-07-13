export interface User {
    id: string,
    username: string,
    email: string,
    firstName: string,
    lastName: string | null,
    avatarUrl: string |null,
    createdAt: string,
}