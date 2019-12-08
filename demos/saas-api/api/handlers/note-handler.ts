import { JsonController, Get, Post, Param, Delete, Body, CurrentUser, QueryParam, ForbiddenError} from 'routing-controllers';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User } from '../data-access/models/user';
import { Note } from '../data-access/models/note';
import { MembershipRole } from '../data-access/models/membership';
import { UserContext, UserContextRequired, IMembershipContext } from '../decorators/user-context';

@Service()
@JsonController()
export class NoteController {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Note)
        private noteRepository: Repository<Note>,
    ) {
    }

    @Get('/notes/')
    public getNotes(
        @UserContext({ required: UserContextRequired.MEMBERSHIP }) context: IMembershipContext,
    ): Promise<Note[]> {
        const notes = this.noteRepository.find({
            where: {
                account: context.account.id,
            },
        });
        return notes;
    }

    @Get('/notes/:id')
    public async getOneNote(
        @UserContext({ required: UserContextRequired.MEMBERSHIP }) context: IMembershipContext,
        @Param('id') noteId: string,
    ): Promise<Note> {
        const note = await this.noteRepository.findOne(noteId, {
            where: {
                accountId: context.account.id,
            },
        });
        return note;
    }

    @Post('/notes')
    public async createNote(
        @UserContext({ required: UserContextRequired.MEMBERSHIP }) context: IMembershipContext,
        @Body() note: Note,
    ): Promise<Note> {
        note.accountId = context.account.id;
        return await this.noteRepository.save(note);
    }

    @Delete('/notes/:id')
    public async delete(
        @UserContext({ required: UserContextRequired.MEMBERSHIP }) context: IMembershipContext,
        @Param('id') id: string,
    ): Promise<any> {
        const note = await this.noteRepository.findOne(id, {
            where: {
                accountId: context.account.id,
            },
        });
        if (note) {
            await this.noteRepository.remove(note);
            return 'removed';
        }
        return undefined;
    }
}
