import { Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user';
import { Account } from './account';

export enum MembershipRole {
    OWNER = 'OWNER',
    ADMIN = 'ADMIN',
    MEMBER = 'MEMBER',
}

@Entity()
export class Membership {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @ManyToOne((type) => User, (user) => user.memberships)
    public user: User;

    @ManyToOne((type) => Account, (account) => account.memberships)
    public account: Account;

    @Column()
    public role: MembershipRole;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;
}
