import { createConnection } from 'typeorm';

import { User } from './models/user';
import { Account } from './models/account';
import { Membership } from './models/membership';
import { Invite } from './models/invite';
import { Note } from './models/note';

createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root1234',
    database: 'notes',
    entities: [ User, Account, Note, Membership, Invite ],
    migrations: [ ], // put migrations here
});
