export class User {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public avatar?: string,
        public role?: string,
        public google?: boolean,
        public _id?: string
    ) {}
}
