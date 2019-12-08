import { Service } from 'typedi';
import { User } from '../models/user';

@Service()
export class UserRepository {
    private users: User[] = [
        new User(),
    ];

    public findAll() {
        return Promise.resolve(this.users);
    }

    public findOne(id: string) {
        let foundCategory: User;
        this.users.forEach((user) => {
            if (user.id === id) {
                foundCategory = user;
            }
        });
        return foundCategory;
    }

    public save(user: User) {
        this.users.push(user);
        return user;
    }

    public remove(id: string) {
        const user = this.findOne(id);
        if (user) {
            this.users.splice(this.users.indexOf(user), 1);
        }
        return user;
    }

}
