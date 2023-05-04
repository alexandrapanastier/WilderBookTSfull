import { Skill } from "../entity/Skill";
import dataSource from "../utils";
import { Request, Response } from "express";

const skillcontroller = {
    create: async (req: Request, res: Response): Promise<void> => {
        try{
        const skill = new Skill();
        skill.name = req.body.name;
        await dataSource.manager.save(skill);
        res.send("Skill created")
        }
        catch (err) {
        console.log(err);
        res.send("Error while creating the Skill");
        }
    },
    read: async (req: Request, res: Response): Promise<void> => {
        try{
        const skills = await dataSource.manager.find(Skill);
        res.send(skills);
        }
        catch (err) {
        console.log(err);
        res.send("Error while reading the Skill");
        }

    },
    update: async (req: Request, res: Response): Promise<void> => {
        try{
        const id = Number(req.params.id);
        const skill = await dataSource.manager.findOne(Skill, { where: { id } });
        if (skill != null) {
            skill.name = req.body.name;
            await dataSource.manager.save(skill);
        }
        res.send("Skill updated");
        }
        catch (err) {
        console.log(err);
        res.send("Error while updating the Skill");
        }
    },
    delete: async (req: Request, res: Response): Promise<void> => {
        try{
        const id = Number(req.params.id);
        const skill = await dataSource.manager.findOne(Skill, { where: { id } });
        if (skill != null) {
            await dataSource.manager.remove(skill);
        }
        res.send("Skill deleted");
        }
        catch (err) {
        console.log(err);
        res.send("Error while deleting the Skill");
        }
    }
};

export default skillcontroller;