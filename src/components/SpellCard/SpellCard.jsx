import React from "react";
import "./SpellCard.css"; // Файл стилей, который мы создадим отдельно

const App = () => {
  const spellData = [
    {
      title: "Лечение ран",
      level: 1,
      category: "Воплощение",
      castingTime: "1 действие",
      range: "Касание",
      components: "В, С",
      duration: "Мгновенная",
      description:
        "Существо, которого вы касаетесь, восстанавливает количество хитов, равное 1к8 + ваш модификатор базовой характеристики. Это заклинание не оказывает никакого эффекта на Нежить и Конструктов.",
      higherLevelDescription:
        "Если вы накладываете это заклинание, используя ячейку 2-го уровня или выше, лечение увеличивается на 1к8 за каждый уровень ячейки выше первого.",
      spellClass: "Паладин"
    },
    {
      title: "Огненный шар",
      level: 3,
      category: "Воплощение",
      castingTime: "1 действие",
      range: "150 футов",
      components: "В, С, М (маленький кусок батиста и капля масла)",
      duration: "Мгновенная",
      description:
        "Огненный взрыв наносит 8к6 урона огнем каждому существу в радиусе 20 футов от выбранной точки. Существо может сделать спасбросок Ловкости, чтобы получить половину урона.",
      higherLevelDescription:
        "Когда вы используете ячейку заклинаний 4-го уровня или выше, урон увеличивается на 1к6 за каждый уровень ячейки выше третьего.",
      spellClass: "Маг"
    },
    {
      title: "Щит",
      level: 1,
      category: "Заклинание реакции",
      castingTime: "1 реакция",
      range: "Сам",
      components: "В, С",
      duration: "1 раунд",
      description:
        "Вы мгновенно создаете магический барьер, увеличивающий ваш КД на +5 до начала вашего следующего хода. Это заклинание также блокирует все магические стрелы.",
      higherLevelDescription: null,
      spellClass: "Маг"
    }
  ];

  const SpellCard = ({
    title,
    level,
    category,
    castingTime,
    range,
    components,
    duration,
    description,
    higherLevelDescription,
    spellClass
  }) => {
    return (
      <div className="spell-card">
        <div className="spell-card__header">
          <h1>{title}</h1>
          <p>
            {level} уровень - {category}
          </p>
        </div>

        <div className="spell-card__details">
          <div>
            <strong>Время накладывания:</strong>
            <span>{castingTime}</span>
          </div>
          <div>
            <strong>Дистанция:</strong>
            <span>{range}</span>
          </div>
          <div>
            <strong>Компоненты:</strong>
            <span>{components}</span>
          </div>
          <div>
            <strong>Длительность:</strong>
            <span>{duration}</span>
          </div>
        </div>

        <div className="spell-card__description">
          <p>{description}</p>
        </div>

        {higherLevelDescription && (
          <div className="spell-card__higher-level">
            <h3>На более высоком уровне</h3>
            <p>{higherLevelDescription}</p>
          </div>
        )}

        <div className="spell-card__footer">
          <p>{spellClass} - Базовые заклинания</p>
        </div>
      </div>
    );
  };

  return (
    <div>
      {spellData.map((spell, index) => (
        <SpellCard
          key={index}
          title={spell.title}
          level={spell.level}
          category={spell.category}
          castingTime={spell.castingTime}
          range={spell.range}
          components={spell.components}
          duration={spell.duration}
          description={spell.description}
          higherLevelDescription={spell.higherLevelDescription}
          spellClass={spell.spellClass}
        />
      ))}
    </div>
  );
};

export default App;
