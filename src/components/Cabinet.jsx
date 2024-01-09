import React from 'react';
import { useDispatch } from 'react-redux';
import { removeCabinet } from '../features/cabinetSlice/cabinetSlice';
import CatForm from './CatForm';
import CatList from './CatList';
import '../styles/Cabinet.scss';

const Cabinet = ({ cabinet }) => {
    const dispatch = useDispatch();

    return (
        <div className="cabinet">
            <h2>Кабінет {cabinet.id}</h2>
            <CatList cats={cabinet.cats} cabinetId={cabinet.id} />
            <CatForm cabinetId={cabinet.id} />
            <button onClick={() => dispatch(removeCabinet(cabinet.id))}>Видалити кабінет ❌</button>
        </div>
    );
};

export default Cabinet;
