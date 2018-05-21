import { User } from './user.model';

export class Hospital {

    public user: User;

    constructor(
        public name: string,
        public avatar?: string,
        public _id?: string
    ) {}
}
