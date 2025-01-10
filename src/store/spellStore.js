// store/spellStore.js
import { makeAutoObservable } from "mobx";

class SpellStore {
  spellData = [
    {
      title: "Призрачный клинок",
      level: 2,
      category: "Заклинание",
      castingTime: "1 бонусное действие",
      range: "Сам",
      components: "В, С",
      duration: "Концентрация, до 1 минуты",
      description:
        "Вы создаете магический клинок из эфира. Он наносит 2к6 урона психической энергии при попадании.",
      higherLevelDescription:
        "На более высоких уровнях урон увеличивается на 1к6 за каждые 2 уровня выше второго.",
      spellClass: "Волшебник",
      school: "Некромантия"
    },
    {
      title: "Ускорение",
      level: 3,
      category: "Воплощение",
      castingTime: "1 действие",
      range: "30 футов",
      components: "В, С, М (струна из кожи)",
      duration: "Концентрация, до 1 минуты",
      description:
        "Вы увеличиваете скорость существа в два раза, добавляете бонус к КД и позволяете выполнить дополнительное действие каждый ход.",
      higherLevelDescription:
        "Вы можете воздействовать на одно дополнительное существо за каждый уровень выше третьего.",
      spellClass: "Маг",
      school: "Изменение"
    },
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
      spellClass: "Паладин",
      school: "Воплощение"
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
      spellClass: "Маг",
      school: "Огненная магия"
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
      spellClass: "Маг",
      school: "Защита"
    },
    {
      title: "Призыв элементаля",
      level: 5,
      category: "Призывание",
      castingTime: "1 минута",
      range: "90 футов",
      components: "В, С, М (камень и вода)",
      duration: "Концентрация, до 1 часа",
      description:
        "Вы вызываете элементаля, который подчиняется вашим приказам. Он действует по вашему сигналу, атакуя врагов.",
      higherLevelDescription:
        "Когда вы используете ячейку заклинаний 6-го уровня или выше, призывается более мощный элементаль.",
      spellClass: "Друид",
      school: "Призывание"
    }
  ];

  filter = {
    level: null,
    category: null,
    spellClass: null,
    castingTime: null,
    range: null,
    components: null,
    duration: null,
    school: null
  };

  constructor() {
    makeAutoObservable(this);
  }

  setFilter(key, value) {
    this.filter[key] = value;
  }

  get filteredSpells() {
    return this.spellData.filter(
      (spell) =>
        (this.filter.level === null || spell.level === this.filter.level) &&
        (this.filter.category === null || spell.category === this.filter.category) &&
        (this.filter.spellClass === null || spell.spellClass === this.filter.spellClass) &&
        (this.filter.castingTime === null || spell.castingTime === this.filter.castingTime) &&
        (this.filter.range === null || spell.range === this.filter.range) &&
        (this.filter.components === null || spell.components.includes(this.filter.components)) &&
        (this.filter.duration === null || spell.duration === this.filter.duration) &&
        (this.filter.school === null || spell.school === this.filter.school)
    );
  }
}

const spellStore = new SpellStore();
export default spellStore;
