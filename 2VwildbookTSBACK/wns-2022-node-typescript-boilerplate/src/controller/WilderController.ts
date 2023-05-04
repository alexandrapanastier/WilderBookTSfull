import { Wilder } from "../entity/Wilder";
import dataSource from "../utils";
import { Request, Response } from "express";
import { Skill } from "../entity/Skill";

const wildercontroller = {
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      const wilder = new Wilder();
      wilder.name = req.body.name;
      wilder.city = req.body.city;
      await dataSource.manager.save(wilder);
      res.send("Wilder created");
    } catch (err) {
      console.log(err);
      res.send("Error while creating the Wilder");
    }
  },
  read: async (req: Request, res: Response): Promise<void> => {
    const wilders = await dataSource.manager.find(Wilder, { relations: ['skills', 'grades'] });
    res.json(wilders);
  },
  update: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const wilder = await dataSource.manager.findOne(Wilder, { where: { id } });
      if (wilder != null) {
        wilder.name = req.body.name;
        wilder.city = req.body.city;
        wilder.skills = req.body.skills;
        await dataSource.manager.save(wilder);
      }
      res.send("Wilder updated");
    } catch (err) {
      console.log(err);
      res.send("Error while updating the Wilder");
    }
  },
  delete: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const wilder = await dataSource.manager.findOne(Wilder, { where: { id } });
      if (wilder != null) {
        await dataSource.manager.remove(wilder);
      }
      res.send("Wilder deleted");
    } catch (err) {
      console.log(err);
      res.send("Error while deleting the Wilder");
    }
  },
  addSkill: async (req: Request, res: Response): Promise<void> => {
    try {
      const wilderName = req.body.wilderName;
      const skillName = req.body.skillName;
      const wilderRepository = dataSource.getRepository(Wilder);
      const skillRepository = dataSource.getRepository(Skill);
  
      // On récupère le wilder
      const wilder = await wilderRepository.findOne({ where: { name: wilderName }, relations: ['skills'] });
      if (wilder) {
        // On récupère la skill associée
        const skill = await skillRepository.findOne({ where: { name: skillName } });
        if (skill) {
          // On ajoute la skill au wilder
          wilder.skills.push(skill);
          await wilderRepository.save(wilder);
          res.send("Skill added");
        } else {
          res.send("Skill not found");
        }
      } else {
        res.send("Wilder not found");
      }
    } catch (err) {
      console.log(err);
      res.send("Error while adding the Skill");
    }
  }
  
  
};

export default wildercontroller;
