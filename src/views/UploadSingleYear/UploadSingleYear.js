import MultipleFileUploadCard from '../../components/MultipleFileUploadCard/MultipleFileUploadCard';
import './UploadSingleYear.css';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx';

const UploadSingleYear = () => {
    const [cards, setCards] = useState([{ id: 1, schoolData: [], mapping: {}, pipeLineSchools: [], year: '' }]);
    const navigate = useNavigate();
    const location = useLocation();

    // const handleAddCard = () => {
    //     if(cards.length === 0){
    //         setCards([{ id: 1, schoolData: [], mapping: {}, pipeLineSchools: [], year: '' }]);
    //     } else {
    //         const sortedCards = cards.sort((a, b) => b.id - a.id);
    //         const newCard = { id: sortedCards[0].id + 1, schoolData: [], mapping: {}, pipeLineSchools: [], year: '' };
    //         const finalSortedCards = [...cards, newCard].sort((a, b) => a.id - b.id);
    //         setCards(finalSortedCards);
    //     }
    // };

    const handleFileUpload = (file, id, type) => {
        const fileReader = new FileReader();

        fileReader.onload = (event) => {
            let updatedCard;
            const updatedCards = cards.map(card => {
                if (card.id === id) {
                    if (type === 'data' && file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                        const data = new Uint8Array(event.target.result);
                        const workbook = XLSX.read(data, { type: 'array' });
                        const sheetName = workbook.SheetNames[0];
                        const worksheet = workbook.Sheets[sheetName];
                        const jsonData = XLSX.utils.sheet_to_json(worksheet);
                        updatedCard = { ...card, schoolData: jsonData };
                    } else if (type === 'mapping' && file.type === 'application/json') {
                        const jsonData = JSON.parse(event.target.result);
                        updatedCard = { ...card, mapping: jsonData };
                    } else if (type === 'pipeline_schools' && file.type === 'text/plain') {
                        const textData = event.target.result.split('\n');
                        updatedCard = { ...card, pipeLineSchools: textData };
                    } else {
                        alert('Invalid file type');
                    }
                }
                return updatedCard ? updatedCard : card;
            });
            console.log(updatedCards,"-----updatedCards------");
            setCards(updatedCards);
        };

        if (type === 'data') {
            fileReader.readAsArrayBuffer(file);
        } else {
            fileReader.readAsText(file);
        }
    };

    const handleDeleteCard = (id) => {
        const filteredCards = cards.filter(card => card.id !== id);
        setCards(filteredCards);
    };

    const handleNavigateHome = () => {
        navigate(`${location.pathname}/home`, { state: { cards } });
    };

    return (
        <div className="UploadSingleYear">
            {cards.map((card) => (
                <MultipleFileUploadCard key={card.id} id={card.id} handleDeleteCard={handleDeleteCard} handleFileUpload={handleFileUpload} />
            ))}
            <div onClick={handleNavigateHome} className="add-button">Proceed</div>
            </div>
    );
}

export default UploadSingleYear;
