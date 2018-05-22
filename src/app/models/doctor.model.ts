import { Hospital } from './hospital.model';
import { User } from './user.model';

export class Doctor {

    user: User;

    constructor(
        public name?: string,
        public avatar?: string,
        public _id?: string,
        public hospital?: string
    ) {}
}
