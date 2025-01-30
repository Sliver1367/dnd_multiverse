import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import Filters from "../Filters/Filters";
import SpellCard from "../SpellCard/SpellCard";
import SelectedSpells from "../SelectedSpells/SelectedSpells";
import "./AllSpells.css";

const classMapping = {
  classWizard: "Волшебник",
  classSorcerer: "Чародей",
  classWarlock: "Колдун",
  classCleric: "Жрец",
  classDruid: "Друид",
  classPaladin: "Паладин",
  classRanger: "Следопыт",
  classBard: "Бард",
  classBarbarian: "Варвар",
  classFighter: "Боец",
  classMonk: "Монах",
  classRogue: "Плут",
};

const AllSpells = ({ preSelectedSpells = [] }) => {
  const [spells, setSpells] = useState([]);
  const [filteredSpells, setFilteredSpells] = useState([]);
  const [selectedSpells, setSelectedSpells] = useState(preSelectedSpells);
  const [filterOptions, setFilterOptions] = useState({});

  useEffect(() => {
    const fetchSpells = async () => {
      const querySnapshot = await getDocs(collection(db, "spells"));
      const spellsData = querySnapshot.docs.map((doc) => doc.data());
      setSpells(spellsData);
      setFilteredSpells(spellsData);

      const uniqueLevels = [
        ...new Set(spellsData.map((spell) => spell.level)),
      ].sort();
      const uniqueCastingTimes = [
        ...new Set(spellsData.map((spell) => spell.castingTimeRus)),
      ].sort();
      const uniqueDurations = [
        ...new Set(spellsData.map((spell) => spell.durationRus)),
      ].sort();
      const uniqueSchools = [
        ...new Set(spellsData.map((spell) => spell.schoolRus || spell.school)),
      ].sort();
      const uniqueRanges = [
        ...new Set(spellsData.map((spell) => spell.rangeFt)),
      ].sort();
      const uniqueClasses = [
        ...new Set(
          spellsData.flatMap((spell) =>
            Object.keys(spell).filter(
              (key) => key.startsWith("class") && spell[key] === true
            )
          )
        ),
      ]
        .sort()
        .map((cls) => classMapping[cls] || cls);

      setFilterOptions({
        levels: uniqueLevels,
        castingTimes: uniqueCastingTimes,
        durations: uniqueDurations,
        schools: uniqueSchools,
        ranges: uniqueRanges,
        classes: uniqueClasses,
      });
    };

    fetchSpells();
  }, []);

  useEffect(() => {
    setSelectedSpells(preSelectedSpells);
  }, [preSelectedSpells]);

  const applyFilters = (newFilters) => {
    let filtered = spells.filter((spell) => {
      const isRitual = spell.ritual === true;
      const isConcentration = spell.concentration === true;

      // Проверка на компонент M (если там текст)
      const hasComponentM = spell.componentM && spell.componentM.trim() !== "";

      const passesComponentV =
        (newFilters.componentV === null ||
          spell.componentV === newFilters.componentV) &&
        (newFilters.excludeComponentV === null ||
          spell.componentV !== newFilters.excludeComponentV);

      const passesComponentS =
        (newFilters.componentS === null ||
          spell.componentS === newFilters.componentS) &&
        (newFilters.excludeComponentS === null ||
          spell.componentS !== newFilters.excludeComponentS);

      const passesComponentM =
        (newFilters.componentM === null ||
          hasComponentM === newFilters.componentM) &&
        (newFilters.excludeComponentM === null ||
          hasComponentM !== newFilters.excludeComponentM);

      const belongsToClass =
        !newFilters.class ||
        Object.keys(classMapping).some(
          (classKey) =>
            spell[classKey] === true &&
            classMapping[classKey] === newFilters.class
        );

      return (
        (!newFilters.name ||
          spell.titleRus
            ?.toLowerCase()
            .includes(newFilters.name.toLowerCase())) &&
        (!newFilters.level || spell.level === parseInt(newFilters.level, 10)) &&
        (!newFilters.ritual || isRitual === newFilters.ritual) &&
        (!newFilters.castingTime ||
          spell.castingTimeRus === newFilters.castingTime) &&
        (!newFilters.rangeFt || spell.rangeFt === newFilters.rangeFt) &&
        (!newFilters.duration || spell.durationRus === newFilters.duration) &&
        (!newFilters.school ||
          spell.schoolRus === newFilters.school ||
          spell.school === newFilters.school) &&
        passesComponentV &&
        passesComponentS &&
        passesComponentM &&
        (!newFilters.concentration ||
          isConcentration === newFilters.concentration) &&
        belongsToClass
      );
    });

    // Если нет активных фильтров — показываем полный список
    const hasActiveFilters = Object.values(newFilters).some(
      (value) => value !== "" && value !== null && value !== false
    );
    setFilteredSpells(hasActiveFilters ? filtered : spells);
  };

  const toggleSelectSpell = (spell) => {
    setSelectedSpells((prevSelected) => {
      if (prevSelected.some((s) => s.titleRus === spell.titleRus)) {
        return prevSelected.filter((s) => s.titleRus !== spell.titleRus);
      }
      return [...prevSelected, spell];
    });
  };

  const removeSpell = (spellToRemove) => {
    setSelectedSpells((prevSelected) =>
      prevSelected.filter((spell) => spell.titleRus !== spellToRemove.titleRus)
    );
  };

  const resetSelectedSpells = () => {
    setSelectedSpells([]);
  };

  return (
    <div className="all-spells-container">
      <div className="filters-container">
        <Filters filterOptions={filterOptions} onApplyFilters={applyFilters} />
      </div>

      <div className="cards-container">
        {filteredSpells
          .sort((a, b) => a.titleRus.localeCompare(b.titleRus))
          .map((spell, index) => (
            <SpellCard
              key={index}
              spell={spell}
              isSelected={selectedSpells.some(
                (s) => s.titleRus === spell.titleRus
              )}
              onSelect={() => toggleSelectSpell(spell)}
            />
          ))}
      </div>

      <div className="selected-spells-container">
        <SelectedSpells
          selectedSpells={selectedSpells}
          onResetSpells={resetSelectedSpells}
          onRemoveSpell={removeSpell}
        />
      </div>
    </div>
  );
};

export default AllSpells;
