import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import Filters from "../Filters/Filters";
import SpellCard from "../SpellCard/SpellCard";
import SelectedSpells from "../SelectedSpells/SelectedSpells"; // Компонент для выбранных карточек
import "./AllSpells.css";

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

      const uniqueLevels = [...new Set(spellsData.map((spell) => spell.level))];
      const uniqueCategories = [
        ...new Set(spellsData.map((spell) => spell.category)),
      ];
      const uniqueCastingTimes = [
        ...new Set(spellsData.map((spell) => spell.castingTimeRus)),
      ];
      const uniqueDurations = [
        ...new Set(spellsData.map((spell) => spell.durationRus)),
      ];
      const uniqueSchools = [
        ...new Set(spellsData.map((spell) => spell.schoolRus || spell.school)),
      ];

      setFilterOptions({
        levels: uniqueLevels,
        categories: uniqueCategories,
        castingTimes: uniqueCastingTimes,
        durations: uniqueDurations,
        schools: uniqueSchools,
      });
    };

    fetchSpells();
  }, []);

  const applyFilters = (newFilters) => {
    const filtered = spells.filter((spell) => {
      return (
        (!newFilters.level || spell.level === newFilters.level) &&
        (!newFilters.category || spell.category === newFilters.category) &&
        (!newFilters.castingTime ||
          spell.castingTimeRus === newFilters.castingTime) &&
        (!newFilters.duration || spell.durationRus === newFilters.duration) &&
        (!newFilters.school || spell.schoolRus === newFilters.school)
      );
    });

    setFilteredSpells(filtered);
  };

  const toggleSelectSpell = (spell) => {
    setSelectedSpells((prevSelected) => {
      if (prevSelected.includes(spell)) {
        return prevSelected.filter((s) => s !== spell);
      } else {
        return [...prevSelected, spell];
      }
    });
  };

  return (
    <div className="all-spells-container">
      <div className="filters-container">
        <Filters filterOptions={filterOptions} onApplyFilters={applyFilters} />
      </div>

      <div className="cards-container">
        {filteredSpells.map((spell, index) => (
          <SpellCard
            key={index}
            spell={spell}
            isSelected={selectedSpells.includes(spell)}
            onSelect={() => toggleSelectSpell(spell)}
          />
        ))}
      </div>

      <div className="selected-spells-container">
        <SelectedSpells selectedSpells={selectedSpells} />
      </div>
    </div>
  );
};

export default AllSpells;