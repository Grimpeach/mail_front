export interface UserData {
    userId: number;
    username: string;
    passwordHash?: string; // Обычно не передаётся клиенту
    email: string;
    createdAt: string;
    isOnline: boolean;
    lastSeen: string | null;
    isActive: boolean;
    deactivationDate?: string | null;
    profilePictureUrl?: string | null;
}
