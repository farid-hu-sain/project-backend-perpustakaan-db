export declare const register: (data: {
    username: string;
    email: string;
    password: string;
    role?: string;
}) => Promise<{
    email: any;
    username: any;
    role: any;
}>;
export declare const login: (data: {
    email: string;
    password: string;
}) => Promise<{
    userReturn: {
        email: any;
        username: any;
        role: any;
    };
    token: string;
}>;
//# sourceMappingURL=auth.service.d.ts.map