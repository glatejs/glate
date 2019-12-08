import { JsonController, Get, Post, Param, Delete, Body} from 'routing-controllers';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User } from '../data-access/models/user';
import { Note } from '../data-access/models/note';

@Service()
@JsonController()
export class UserController {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Note)
        private noteRepository: Repository<Note>,
    ) {
    }

    @Get('/users')
    public all(): Promise<User[]> {
        return this.userRepository.find();
    }

    @Get('/users/:id')
    public one(@Param('id') id: string): Promise<User> {
        return this.userRepository.findOne(id);
    }

    @Post('/users')
    public async users(@Body() user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    @Delete('/users/:id')
    public async delete(@Param('id') id: string): Promise<any> {
        const user = await this.userRepository.findOne(id);
        await this.userRepository.remove(user);
        return 'done';
    }

}
