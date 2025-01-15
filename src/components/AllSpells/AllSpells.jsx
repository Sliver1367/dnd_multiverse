import React from "react";
import { observer } from "mobx-react-lite";
import spellStore from "../../store/spellStore";
import Filters from "../Filters/Filters";
import "./AllSpells.css";

const SpellDatabase = () => {
  return (
    <div>
      <Filters store={spellStore} />

      <div className="cards-container">
        {spellStore.filteredSpells.map((spell, index) => (
          <div key={index} className="spell-card">
            <div className="spell-card__header">
              <h1>{spell.title}</h1>
              <p>
                {spell.level} уровень - {spell.category}
              </p>
            </div>

            <div className="spell-card__details">
              <table className="spell-card__table">
                <tbody>
                  <tr>
                    <td><strong>Время накладывания:</strong></td>
                    <td>{spell.castingTime}</td>
                  </tr>
                  <tr>
                    <td><strong>Дистанция:</strong></td>
                    <td>{spell.range}</td>
                  </tr>
                  <tr>
                    <td><strong>Компоненты:</strong></td>
                    <td>{spell.components}</td>
                  </tr>
                  <tr>
                    <td><strong>Длительность:</strong></td>
                    <td>{spell.duration}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="spell-card__description">
              <p>{spell.description}</p>
            </div>

            {spell.higherLevelDescription && (
              <div className="spell-card__higher-level">
                <h3>На более высоком уровне</h3>
                <p>{spell.higherLevelDescription}</p>
              </div>
            )}

            <div className="spell-card__footer">
              <p>{spell.spellClass} - {spell.school}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default observer(SpellDatabase);
