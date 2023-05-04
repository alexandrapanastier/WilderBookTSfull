import dataSource from "../utils";
import { Request, Response } from "express";
import { Skill } from "../entity/Skill";
import { Wilder } from "../entity/Wilder";
import { Grade } from "../entity/Grade";

const gradecontroller = {
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      const grade = new Grade();
      grade.grade = req.body.grade;


      const wilder = await dataSource.manager.findOne(Wilder, { where: { id: req.body.wilderId } });
      const skill = await dataSource.manager.findOne(Skill, { where: { id: req.body.skillId } });

 
      grade.wilder = wilder!;
      grade.skill = skill!;

      await dataSource.manager.save(grade);
      res.send("Grade created");
    } catch (err) {
      console.log(err);
      res.send("Error while creating the Grade");
    }
  },
  read: async (req: Request, res: Response): Promise<void> => {
    try {
      const grades = await dataSource.manager.find(Grade);
      res.json(grades);
    }
    catch (err) {
    console.log(err);
    res.send("Error while reading the Grade");
    }
  },
};

export default gradecontroller;
