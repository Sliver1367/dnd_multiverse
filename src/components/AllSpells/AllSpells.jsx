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

const AllSpells = () => {
  const [spells, setSpells] = useState([]);
  const [filteredSpells, setFilteredSpells] = useState([]);
  const [selectedSpells, setSelectedSpells] = useState([]);
  const [filterOptions, setFilterOptions] = useState({});

  useEffect(() => {
    const fetchSpells = async () => {
      const querySnapshot = await getDocs(collection(db, "spells"));
      const spellsData = querySnapshot.docs.map((doc) => doc.data());
      setSpells(spellsData);
      setFilteredSpells(spellsData);

      const uniqueLevels = [...new Set(spellsData.map((spell) => spell.level))].sort();
      const uniqueCastingTimes = [
        ...new Set(spellsData.map((spell) => spell.castingTimeRus)),
      ].sort();
      const uniqueDurations = [
        ...new Set(spellsData.map((spell) => spell.durationRus)),
      ].sort();
      const uniqueSchools = [
        ...new Set(spellsData.map((spell) => spell.schoolRus || spell.school)),
      ].sort();
      const uniqueRanges = [...new Set(spellsData.map((spell) => spell.rangeFt))].sort();
      const uniqueClasses = [
        ...new Set(
          spellsData.flatMap((spell) =>
            Object.keys(spell).filter(
              (key) => key.startsWith("class") && spell[key] === "TRUE"
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

  const applyFilters = (newFilters) => {
    const filtered = spells.filter((spell) => {
      const isRitual = spell.ritual === "TRUE";
      const isConcentration = spell.concentration === "TRUE";
      const hasComponentV = spell.componentV === "TRUE";
      const hasComponentS = spell.componentS === "TRUE";
      const hasComponentM = spell.componentM && spell.componentM.trim().length > 0;

      const classKey = Object.keys(classMapping).find(
        (key) => classMapping[key] === newFilters.class
      );

      return (
        (!newFilters.level || spell.level === newFilters.level) &&
        (!newFilters.ritual || isRitual === newFilters.ritual) &&
        (!newFilters.castingTime ||
          spell.castingTimeRus === newFilters.castingTime) &&
        (!newFilters.rangeFt || spell.rangeFt === newFilters.rangeFt) &&
        (!newFilters.componentV || hasComponentV) &&
        (!newFilters.componentS || hasComponentS) &&
        (!newFilters.componentM || hasComponentM) &&
        (!newFilters.concentration ||
          isConcentration === newFilters.concentration) &&
        (!newFilters.duration || spell.durationRus === newFilters.duration) &&
        (!newFilters.onHigherLevel ||
          spell.onHigherLevel === newFilters.onHigherLevel) &&
        (!newFilters.school ||
          spell.schoolRus === newFilters.school ||
          spell.school === newFilters.school) &&
        (!newFilters.class || (classKey && spell[classKey] === "TRUE"))
      );
    });

    setFilteredSpells(filtered);
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
              isSelected={selectedSpells.some((s) => s.titleRus === spell.titleRus)}
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