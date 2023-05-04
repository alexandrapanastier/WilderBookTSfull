import express from "express";
import cors from "cors";
import dataSource from "./utils";
import wildercontroller from "./controller/WilderController";
import skillcontroller from "./controller/SkillController";
import gradecontroller from "./controller/GradeController";
const app = express();
app.use(cors());
app.use(express.json());


// /api/wilder/addSkill

app.post("/api/wilder", wildercontroller.create);
app.get("/api/wilder", wildercontroller.read);
app.put("/api/wilder/:id", wildercontroller.update);
app.delete("/api/wilder/:id", wildercontroller.delete);

app.post("/api/skill", skillcontroller.create);
app.get("/api/skill", skillcontroller.read);
app.put("/api/skill/:id", skillcontroller.update);
app.delete("/api/skill/:id", skillcontroller.delete);

app.post("/api/grade", gradecontroller.create);
app.get("/api/grade", gradecontroller.read);

app.put("/api/addskill", wildercontroller.addSkill);


const start = async (): Promise<void> => {
  await dataSource.initialize();

  app.listen(5000, () => {
    console.log("Server started");
  });
};

void start();
