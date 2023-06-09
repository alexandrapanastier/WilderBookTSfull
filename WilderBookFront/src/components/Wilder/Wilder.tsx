import styles from './Wilder.module.css';
import avatar from '../../assets/profile.png';
import Skill , {ISkill} from '../Skill/Skill';
import axios from 'axios';
import PropTypes from "prop-types";



export interface IWilder {
  id: number;
  name: string;
  city: string;
  skills: ISkill[];
}


const Wilder: React.FC<IWilder> = ({ name, skills, id, city, setWildersData }) => {
  const handleDeleteWilder = (id: number) => {
    axios.delete(`http://localhost:5000/api/wilder/${id}`).then(() => {
      // Mettre à jour l'état pour exclure le wilder supprimé
      setWildersData((prevWilders: any[]) => prevWilders.filter((wilder) => wilder.id !== id));
    });
  };
  
  return (
    <article className={styles.card}>
      <img src={avatar} alt="Wilder Profile" className={styles.cardImg} />
      <h3>{name}</h3>
       <h4>{city}</h4> 
      <button className={styles.button} onClick={() => handleDeleteWilder(id)}>Delete</button>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <h4>Wild Skills</h4>
      <ul>
        {skills?.map((skill) => (
          <Skill name={skill.name} grade={skill.grade} id={skill.id}  />
        ))}
      </ul>
    </article>
  );
};

Wilder.propTypes = {
  name: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      grade: PropTypes.number.isRequired,
    })
  ).isRequired,
  id: PropTypes.number.isRequired,
  city: PropTypes.string,
  setWildersData: PropTypes.func.isRequired,
};

export default Wilder;
