import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCabinet } from '../features/cabinetSlice/cabinetSlice';
import Cabinet from './Cabinet';
import '../styles/CabinetManager.scss';

export function formatDate(date) {
    const d = new Date(date);
    const day = (`0${d.getDate()}`).slice(-2);
    const month = (`0${d.getMonth() + 1}`).slice(-2); // Місяці в JavaScript починаються з 0
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
}

const CabinetManager = () => {
    const theme = useSelector((state) => state.theme.value);
    const [filterByToday, setFilterByToday] = useState(false);
    const [filterByAge, setFilterByAge] = useState(false);
    const cabinets = useSelector((state) => state.cabinet.cabinets);
    const dispatch = useDispatch();
    const todayFormatted = formatDate(new Date());

    const getFilteredCats = (cats) => {
        return cats.filter((cat) => {
            const matchesToday = filterByToday ? cat.date === todayFormatted : true;
            const matchesAge = filterByAge ? cat.age < 2 : true;
            return matchesToday && matchesAge;
        });
    };

    return (
        <div className={`cabinets-container ${theme}`}>
            <h1>Кабінети</h1>
            <div className="buttons-container">
            <button onClick={() => dispatch(addCabinet())}>Створити кабінет</button>
            <div className="checkbox-container">
                <label>
                    <input
                        type="checkbox"
                        checked={filterByToday}
                        onChange={(e) => setFilterByToday(e.target.checked)}
                    />
                    Сьогодні
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={filterByAge}
                        onChange={(e) => setFilterByAge(e.target.checked)}
                    />
                    Котенята
                </label>
            </div>
            </div>
            <div>
                {cabinets.map((cabinet) => {
                    const updatedCabinet = {
                    ...cabinet,
                    cats: getFilteredCats(cabinet.cats)
                };
                    return <Cabinet key={cabinet.id} cabinet={updatedCabinet} />;
            })}
        </div>
        </div>
    );
};
export default CabinetManager;
