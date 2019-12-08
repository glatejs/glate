import { Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { Membership } from './membership';
import { Invite } from './invite';
import { Note } from './note';

@Entity()
export class Account {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public title: string;

    @OneToMany((type) => Membership, (membership) => membership.account)
    public memberships: Membership[];

    @OneToMany((type) => Invite, (invite) => invite.account)
    public invites: Invite[];

    @OneToMany((type) => Note, (note) => note.account)
    public notes: Note[];

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;
}
