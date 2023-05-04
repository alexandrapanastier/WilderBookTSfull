import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Skill } from "./Skill";
import { Grade } from "./Grade";

@Entity()
export class Wilder {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    name!: string;
    
    @Column()
    city!: string;
    
    @ManyToMany(() => Skill, skill => skill.wilders)
    @JoinTable()
    skills!: Skill[];

    @OneToMany(() => Grade, (grade) => grade.wilder, { onDelete: "CASCADE" })
    grades!: Grade[];
    
}


