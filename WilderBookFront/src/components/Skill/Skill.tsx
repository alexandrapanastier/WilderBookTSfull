import Styles from "./Skill.module.css";

export interface ISkill {
  id: number;
  name: string;
  grade: number;
}

const Skill: React.FC<ISkill> = ({ name, grade, key }) => {
  return (
    <li className={Styles.skill}>
      {name}
      <span className={Styles.votes}>{grade}</span>
    </li>
  );
};

export default Skill;
