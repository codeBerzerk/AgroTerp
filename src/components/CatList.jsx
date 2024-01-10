import React from 'react';
import { useDispatch } from 'react-redux';
import { removeCat } from '../features/cabinetSlice/cabinetSlice';
import {formatAge} from "./CatForm";

const CatList = ({ cats, cabinetId }) => {
    const dispatch = useDispatch();
    console.log('CatList rendering. Cabinet ID:', cabinetId, 'Cats:', cats);
    return (
        <ul>
            {cats.map((cat) => (
                <li key={cat.id}>
                    {cat.name} -- {cat.breed} -- {formatAge(cat.age)} років -- Дата прийому: {cat.date} -- Факт: {cat.fact}
                    <button style={{padding: 0, cursor: "pointer", background: "none", border: "none", fontSize: '20px', textAlign: "center", marginLeft: "10px" }} onClick={() => dispatch(removeCat({ cabinetId, catId: cat.id }))}>❌</button>
                </li>
            ))}
        </ul>
    );
};

export default CatList;
