// components/Filters.js
import React from "react";
import { observer } from "mobx-react-lite";

const Filters = ({ store }) => {
  return (
    <div className="filters">
      <label>
        Уровень:
        <select
          onChange={(e) =>
            store.setFilter("level", e.target.value ? parseInt(e.target.value) : null)
          }
        >
          <option value="">Все</option>
          <option value="1">1</option>
          <option value="3">3</option>
          <option value="5">5</option>
        </select>
      </label>

      <label>
        Категория:
        <select
          onChange={(e) =>
            store.setFilter("category", e.target.value || null)
          }
        >
          <option value="">Все</option>
          <option value="Воплощение">Воплощение</option>
          <option value="Заклинание реакции">Заклинание реакции</option>
          <option value="Призывание">Призывание</option>
        </select>
      </label>

      <label>
        Класс заклинания:
        <select
          onChange={(e) =>
            store.setFilter("spellClass", e.target.value || null)
          }
        >
          <option value="">Все</option>
          <option value="Паладин">Паладин</option>
          <option value="Маг">Маг</option>
          <option value="Друид">Друид</option>
        </select>
      </label>

      <label>
        Время накладывания:
        <select
          onChange={(e) =>
            store.setFilter("castingTime", e.target.value || null)
          }
        >
          <option value="">Все</option>
          <option value="1 действие">1 действие</option>
          <option value="1 минута">1 минута</option>
          <option value="1 реакция">1 реакция</option>
        </select>
      </label>

      <label>
        Дистанция:
        <select
          onChange={(e) =>
            store.setFilter("range", e.target.value || null)
          }
        >
          <option value="">Все</option>
          <option value="Касание">Касание</option>
          <option value="150 футов">150 футов</option>
          <option value="90 футов">90 футов</option>
        </select>
      </label>

      <label>
        Компоненты:
        <select
          onChange={(e) =>
            store.setFilter("components", e.target.value || null)
          }
        >
          <option value="">Все</option>
          <option value="В">В</option>
          <option value="С">С</option>
          <option value="М">М</option>
        </select>
      </label>

      <label>
        Длительность:
        <select
          onChange={(e) =>
            store.setFilter("duration", e.target.value || null)
          }
        >
          <option value="">Все</option>
          <option value="Мгновенная">Мгновенная</option>
          <option value="1 раунд">1 раунд</option>
          <option value="Концентрация, до 1 часа">Концентрация, до 1 часа</option>
        </select>
      </label>

      <label>
        Школа заклинаний:
        <select
          onChange={(e) =>
            store.setFilter("school", e.target.value || null)
          }
        >
          <option value="">Все</option>
          <option value="Воплощение">Воплощение</option>
          <option value="Огненная магия">Огненная магия</option>
          <option value="Призывание">Призывание</option>
          <option value="Защита">Защита</option>
        </select>
      </label>
    </div>
  );
};

export default observer(Filters);
