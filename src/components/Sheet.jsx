import React, { useState } from 'react';

const CharacterSheet = () => {
    const [formData, setFormData] = useState({
        name: '',
        class: '',
        background: '',
        race: '',
        level: '',
        experience: '',
        strength: '',
        dexterity: '',
        constitution: '',
        intelligence: '',
        wisdom: '',
        charisma: '',
        // добавьте остальные поля по необходимости
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
            <h1>Dungeons & Dragons Character Sheet</h1>
            <div>
                <label>
                    Имя персонажа:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Класс:
                    <input type="text" name="class" value={formData.class} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Предыстория:
                    <input type="text" name="background" value={formData.background} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Вид:
                    <input type="text" name="race" value={formData.race} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Уровень:
                    <input type="number" name="level" value={formData.level} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Опыт:
                    <input type="number" name="experience" value={formData.experience} onChange={handleChange} />
                </label>
            </div>

            {/* Здесь могут быть добавлены другие поля для характеристики персонажа */}

            <h2>Характеристики</h2>
            <div>
                <label>
                    Сила:
                    <input type="number" name="strength" value={formData.strength} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Ловкость:
                    <input type="number" name="dexterity" value={formData.dexterity} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Телосложение:
                    <input type="number" name="constitution" value={formData.constitution} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Интеллект:
                    <input type="number" name="intelligence" value={formData.intelligence} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Мудрость:
                    <input type="number" name="wisdom" value={formData.wisdom} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Харизма:
                    <input type="number" name="charisma" value={formData.charisma} onChange={handleChange} />
                </label>
            </div>

            {/* Добавьте здесь дополнительные секции для оружия, заклинаний и т.д. */}
        </div>
    );
};

export default CharacterSheet;