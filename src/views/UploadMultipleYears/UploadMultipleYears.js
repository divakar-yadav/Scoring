import MultipleFileUploadCard from '../../components/MultipleFileUploadCard/MultipleFileUploadCard';
import './UploadMultipleYears.css';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx';

const UploadMultipleYears = () => {
    const [cards, setCards] = useState([{ id: 1, schoolData: [], mapping: {}, pipeLineSchools: [], year: '' }]);
    const navigate = useNavigate();
    const location = useLocation();

    const handleAddCard = () => {
        const lastCard = cards[cards.length - 1];
        if (!lastCard.schoolData.length || !Object.keys(lastCard.mapping).length || !lastCard.pipeLineSchools.length) {
            alert('Please upload all three files before adding a new card.');
            return;
        }

        const newCard = { id: lastCard.id + 1, schoolData: [], mapping: {}, pipeLineSchools: [], year: '' };
        setCards([...cards, newCard]);
    };

    const handleFileUpload = (file, id, type) => {
        const fileReader = new FileReader();

        fileReader.onload = (event) => {
            const updatedCards = cards.map(card => {
                if (card.id === id) {
                    if (type === 'data' && file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                        const data = new Uint8Array(event.target.result);
                        const workbook = XLSX.read(data, { type: 'array' });
                        const sheetName = workbook.SheetNames.includes('Data') ? 'Data' : workbook.SheetNames[0];
                        const worksheet = workbook.Sheets[sheetName];
                        const jsonData = XLSX.utils.sheet_to_json(worksheet);
                        return { ...card, schoolData: jsonData };
                    } else if (type === 'mapping' && file.type === 'application/json') {
                        try {
                            const jsonData = JSON.parse(event.target.result);
                            return { ...card, mapping: jsonData };
                        } catch (error) {
                            alert('Invalid JSON file');
                            return card;
                        }
                    } else if (type === 'pipeline_schools' && file.type === 'text/plain') {
                        const textData = event.target.result.split('\n');
                        return { ...card, pipeLineSchools: textData };
                    } else {
                        alert('Invalid file type');
                        return card;
                    }
                }
                return card;
            });
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
        <div className="UploadMultipleYears">
            <div className='UploadMultipleYears_add-button'>
                <div onClick={handleAddCard} className="add-button">Add more Years</div>
                <div onClick={handleNavigateHome} className="proceed-button">Proceed</div>
            </div>
            {cards.map((card) => (
                <MultipleFileUploadCard key={card.id} id={card.id} handleDeleteCard={handleDeleteCard} handleFileUpload={handleFileUpload} />
            ))}
        </div>
    );
};

export default UploadMultipleYears;
