import React, {FC} from 'react';
import {Figure} from "../models/figures/Figure";
import '../App.css'

interface LostFiguresProps {
  title: string;
  figures: Figure[]
}

const LostFigures: FC<LostFiguresProps> = ({title, figures}) => {
  return (
    <div className="lost">
      <h3>Съеденные {title} игрока</h3>
      <ul>
      {figures.map(figure =>
        <li key={figure.id}>
          {figure.logo && <img width={32} height={32} src={figure.logo}/>} is left
        </li>
      )}
      </ul>
    </div>
  );
};

export default LostFigures;
