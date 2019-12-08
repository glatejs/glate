import { Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { Membership } from './membership';
import { Note } from './note';
import { Account } from './account';

@Entity()
export class Invite {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public email: string;

    @Column()
    public accepted: boolean;

    @ManyToOne((type) => Account, (account) => account.invites)
    public account: Account;

    constructor() {
        this.accepted = false;
    }
}
