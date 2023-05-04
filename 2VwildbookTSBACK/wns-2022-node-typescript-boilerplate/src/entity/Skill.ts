import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm";
import { Wilder } from "./Wilder";
import { Grade } from "./Grade";

@Entity()
export class Skill {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    name!: string;

    @ManyToMany(() => Wilder, (wilder) => wilder.skills, { onDelete: "CASCADE" })
    wilders!: Wilder[];

    @OneToMany(() => Grade, (grade) => grade.skill, { onDelete: "CASCADE" })
    grades!: Grade[];
}
