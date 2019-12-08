import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user';
import { Account } from './account';

@Entity()
export class Note {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public title: string;

    @Column()
    public description: string;

    @ManyToOne((type) => User, (user) => user.notes)
    public owner: User;

    @Column({ nullable: true })
    public accountId: string;

    @ManyToOne((type) => Account, (account) => account.notes)
    @JoinColumn({ name: 'accountId' })
    public account: Account;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;
}
