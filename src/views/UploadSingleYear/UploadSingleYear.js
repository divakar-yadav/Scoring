import MultipleFileUploadCard from '../../components/MultipleFileUploadCard/MultipleFileUploadCard';
import './UploadSingleYear.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx';

const UploadSingleYear = () => {
    const [cards, setCards] = useState([{ id: 1, schoolData: [], mapping: {}, pipeLineSchools: [], year: '' }]);
    const [isProceedDisabled, setIsProceedDisabled] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const allCardsHaveFiles = cards.every(card => card.schoolData.length > 0 && Object.keys(card.mapping).length > 0);
        setIsProceedDisabled(!allCardsHaveFiles);
    }, [cards]);

    const handleFileUpload = (file, id, type) => {
        const fileReader = new FileReader();

        fileReader.onload = (event) => {
            let updatedCard;
            const updatedCards = cards.map(card => {
                if (card.id === id) {
                    if (type === 'data' && file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                        const data = new Uint8Array(event.target.result);
                        const workbook = XLSX.read(data, { type: 'array' });
                        const sheetName = workbook.SheetNames.includes('Data') ? 'Data' : workbook.SheetNames[0];
                        const worksheet = workbook.Sheets[sheetName];
                        const jsonData = XLSX.utils.sheet_to_json(worksheet);
                        updatedCard = { ...card, schoolData: jsonData };
                    } else if (type === 'mapping' && (file.type === 'application/json' || file.type === 'text/plain')) {
                        try {
                            const jsonData = JSON.parse(event.target.result);
                            const { k1, k2, k3  } = jsonData;
                            if (typeof k1 === 'undefined' || typeof k2 === 'undefined' || typeof k3 === 'undefined') {
                                alert('Mapping file must include k1, k2, and k3 fields');
                            }
                            else if (typeof k1 !== 'number' || typeof k2 !== 'number' || typeof k3 !== 'number') {
                                alert('Mapping file fields k1, k2, and k3 must be numbers');
                            }
                            else{
                                updatedCard = { ...card, mapping: jsonData };
                            }

                        } catch (error) {
                            alert('Invalid JSON content in the mapping file');
                        }
                    } else if (type === 'pipeline_schools' && file.type === 'text/plain') {
                        const textData = event.target.result.split('\n').map(line => line.trim()).filter(line => line !== '');
                        updatedCard = { ...card, pipeLineSchools: textData };
                    } else {
                        alert('Invalid file type');
                    }
                }
                return updatedCard ? updatedCard : card;
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

    const handleNavigateUploadSection = () => {
        navigate(`/`);
    };

    return (
        <div className="UploadSingleYear">
            <div className='UploadSingleYear_upload_proceed_wrapper'>
                <div onClick={handleNavigateUploadSection} className="upload-button">&#x2190;Upload Section</div>
                <div
                    onClick={!isProceedDisabled ? handleNavigateHome : null}
                    className="add-button"
                    style={{ backgroundColor: isProceedDisabled ? '#8f96defa' : '' }}
                >
                    Proceed&#x2192;
                </div>
            </div>
            {cards.map((card) => (
                <MultipleFileUploadCard key={card.id} id={card.id} handleDeleteCard={handleDeleteCard} handleFileUpload={handleFileUpload} hideDeleteButton={true} />
            ))}
        </div>
    );
}

export default UploadSingleYear;
