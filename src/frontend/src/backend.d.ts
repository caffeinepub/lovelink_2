import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Time = bigint;
export interface Notification {
    id: string;
    notificationType: NotificationType;
    user: Principal;
    isRead: boolean;
    message: string;
    timestamp: Time;
}
export interface Message {
    content: string;
    sender: Principal;
    timestamp: Time;
    receiver: Principal;
}
export interface Profile {
    age: bigint;
    bio: string;
    latitude?: number;
    interests: Array<string>;
    name: string;
    createdAt: Time;
    updatedAt: Time;
    longitude?: number;
    photo?: ExternalBlob;
    isComplete: boolean;
}
export interface Tip {
    to: Principal;
    from: Principal;
    amount_e8s: bigint;
    timestamp: Time;
}
export interface LeaderboardEntry {
    user: Principal;
    name: string;
    totalSent: bigint;
}
export interface Review {
    reviewerId: Principal;
    targetId: Principal;
    rating: bigint;
    text: string;
    timestamp: Time;
}
export enum NotificationType {
    newMatch = "newMatch",
    tipReceived = "tipReceived",
    newMessage = "newMessage"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearAllData(): Promise<void>;
    createOrUpdateProfile(profile: Profile): Promise<void>;
    deleteProfile(user: Principal): Promise<void>;
    dislikeUser(other: Principal): Promise<void>;
    getActivityFeed(): Promise<Array<[Notification, bigint]>>;
    getAllProfiles(): Promise<Array<Profile>>;
    getAverageRating(user: Principal): Promise<number>;
    getCallerProfile(): Promise<Profile | null>;
    getCallerUserProfile(): Promise<Profile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getExploreProfiles(): Promise<Array<Profile>>;
    getLeaderboard(limit: bigint): Promise<Array<LeaderboardEntry>>;
    getMatches(): Promise<Array<Profile>>;
    getMessagesWithUser(user: Principal): Promise<Array<Message>>;
    getNotifications(): Promise<Array<Notification>>;
    getProfile(principal: Principal): Promise<Profile | null>;
    getReviews(user: Principal): Promise<Array<Review>>;
    getTipHistory(user: Principal): Promise<Array<Tip>>;
    getTopTippedUsers(): Promise<Array<Principal>>;
    getTotalTips(user: Principal): Promise<bigint>;
    getUserCount(): Promise<bigint>;
    getUserProfile(user: Principal): Promise<Profile | null>;
    isCallerAdmin(): Promise<boolean>;
    isProfileComplete(user: Principal): Promise<boolean>;
    likeUser(other: Principal): Promise<boolean>;
    markAllNotificationsAsRead(): Promise<void>;
    markNotificationAsRead(notificationId: string): Promise<void>;
    saveCallerUserProfile(profile: Profile): Promise<void>;
    sendMessage(to: Principal, content: string): Promise<void>;
    setProfilePicture(pic: ExternalBlob): Promise<void>;
    submitReview(target: Principal, rating: bigint, text: string): Promise<void>;
    tip(user: Principal, amount_e8s: bigint): Promise<void>;
}
