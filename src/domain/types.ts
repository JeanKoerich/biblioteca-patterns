export type Profile = "student" | "teacher";

export interface Book {
    id: number;
    title: string;
}

export interface Loan {
    bookId: number;
    user: string;
    profile: Profile;
    daysWith: number;
    returned: boolean;
}
