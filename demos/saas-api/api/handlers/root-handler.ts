import { JsonController, Get, Post, Param } from 'routing-controllers';
import { Service } from 'typedi';
import { getConnection } from 'typeorm';
import { UserContext, UserContextRequired } from '../decorators/user-context';
import { User } from '../data-access/models/user';

@Service()
@JsonController()
export class RootController {
    @Post('/sync-model')
    public async syncModel(
        @UserContext({ required: UserContextRequired.ROOT_ACCESS }) user: User, // TODO it passes with user = undefiend
    ): Promise<any> {
        await getConnection().synchronize();
        return 'done';
    }
    @Post('/migrate-up')
    public migrateUp(
        @UserContext({ required: UserContextRequired.ROOT_ACCESS }) user: User,
    ): Promise<any> {
        return getConnection().runMigrations();
    }
    @Post('/migrate-down')
    public async migrateDown(
        @UserContext({ required: UserContextRequired.ROOT_ACCESS }) user: User,
    ): Promise<any> {
        await getConnection().undoLastMigration();
        return 'done';
    }
    @Get('/meta/:entity')
    public meta(@Param('entity') entityName: string): Promise<any> {
        return Promise.resolve(getConnection().getMetadata(entityName).columns.map((c) => c.propertyName));
    }
}
