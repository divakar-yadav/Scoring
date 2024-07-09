import MultipleFileUploadCard from '../../components/MultipleFileUploadCard/MultipleFileUploadCard';
import './UploadMultipleYears.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx';

const UploadMultipleYears = () => {
    const [cards, setCards] = useState([{ id: 1, schoolData: [], mapping: {}, pipeLineSchools: [], year: '' }]);
    const [isProceedEnabled, setIsProceedEnabled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        checkValidation();
    }, [cards]);

    const checkValidation = () => {
        const isValid = cards.every(card => card.schoolData.length && Object.keys(card.mapping).length && card.pipeLineSchools.length);
        setIsProceedEnabled(isValid);
    };

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
                    } else if (type === 'mapping' && (file.type === 'application/json' || file.type === 'text/plain')) {
                        try {
                            const jsonData = JSON.parse(event.target.result);
                            console.log(jsonData,"-----jsonData-----")
                            return { ...card, mapping: jsonData };
                        } catch (error) {
                            alert('Invalid JSON content in the mapping file');
                            return card;
                        }
                    } else if (type === 'pipeline_schools' && file.type === 'text/plain') {
                        const textData = event.target.result.split('\n').map(line => line.trim()).filter(line => line !== '');
                        console.log(textData,"----textData----")
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
        if(cards.length===1) {                            
            alert('At least 1 set of files is required to render the dashboard');
            return
        }
            const filteredCards = cards.filter(card => card.id !== id);
            setCards(filteredCards);
    };

    const handleNavigateHome = () => {
        navigate(`${location.pathname}/home`, { state: { cards } });
    };

    const handleNavigateUploadSection = () => {
        navigate(`/`);
    };

    return (
        <div className="UploadMultipleYears">
            <div className='UploadMultipleYears_nav-buttons'>
                <div onClick={handleNavigateUploadSection} className="upload-section">&#x2190;Upload Section</div>
                <div
                    onClick={isProceedEnabled ? handleNavigateHome : null}
                    className="proceed-button"
                    style={{ backgroundColor: isProceedEnabled ? '#3e4ee1' : '#8f96defa', cursor: isProceedEnabled ? 'pointer' : 'not-allowed' }}
                >
                    Proceed&#x2192;
                </div>
            </div>
            <div className='UploadMultipleYears_add'>
                <div className='UploadMultipleYears_add_button_wrapper'>
                    <div onClick={handleAddCard} className="add-button">Add more Years</div>
                </div>
                {cards.map((card) => (
                    <MultipleFileUploadCard key={card.id} id={card.id} handleDeleteCard={handleDeleteCard} handleFileUpload={handleFileUpload} hideDeleteButton={false} />
                ))}
            </div>
        </div>
    );
};

export default UploadMultipleYears;
