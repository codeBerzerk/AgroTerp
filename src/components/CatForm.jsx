import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {addCat, fetchCatFact} from '../features/cabinetSlice/cabinetSlice';
import {formatDate} from "./CabinetManager";
import '../styles/CatForm.scss';

export function formatAge(age) {
    const ageFloat = parseFloat(age);
    return Number.isInteger(ageFloat) ? ageFloat.toString() : ageFloat.toFixed(1);
}

const CatForm = ({ cabinetId }) => {
    const [catName, setCatName] = useState('');
    const [catAge, setCatAge] = useState('');
    const dispatch = useDispatch();
    const catBreeds = ["Британська", "Сфінкс", "Сіамська", "Мейн-кун", "Регдолл", "Перська", "Бенгальська", "Скоттиш-фолд", "Сибірська", "Абіссінська"];
    const [catBreed, setCatBreed] = useState(catBreeds[0] || '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        formatDate();
        const catData = {
            name: catName,
            breed: catBreed,
            age: formatAge(catAge),
            date: formatDate(new Date()),
        };

        const factResponse = await dispatch(fetchCatFact());
        if (factResponse.meta.requestStatus === 'fulfilled') {
            catData.fact = factResponse.payload;
            dispatch(addCat(cabinetId, catData));

            setCatName('');
            setCatBreed('');
            setCatAge('');
        } else {
            console.error('Failed to fetch cat fact:', factResponse.error);
        }
    };

    return (
        <div className="cat-form-container">
            <h3>Додати котика</h3>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
                placeholder="Ім'я котика"
            />
            <select
                value={catBreed}
                onChange={(e) => setCatBreed(e.target.value)}
            >
                {catBreeds.map(breed => (
                    <option key={breed} value={breed}>{breed}</option>
                ))}
            </select>
            <input
                type="number"
                value={catAge}
                onChange={(e) => setCatAge(e.target.value)}
                placeholder="Вік котика"
            />
            <button type="submit">Додати котика ➕</button>
        </form>
        </div>
    );
};

export default CatForm;
