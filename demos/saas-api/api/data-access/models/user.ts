import { Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, Column, JoinColumn, Unique } from 'typeorm';
import { Membership } from './membership';
import { Note } from './note';

@Entity()
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public isRoot: boolean;

    @Column()
    public email: string;

    @Column({ select: false })
    public password: string;

    @OneToMany((type) => Membership, (membership) => membership.user)
    public memberships: Membership[];

    @OneToMany((type) => Note, (note) => note.owner)
    public notes: Note[];

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;
}
