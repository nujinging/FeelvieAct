import { useState } from "react";

interface GenreSortSelectProps {
    onSelectChange: (value: string) => void;
}

const GenreSortSelect: React.FC<GenreSortSelectProps> = ({ onSelectChange }) => {
    const [selectedValue, setSelectedValue] = useState('');
    const SortClick = async (event : React.ChangeEvent<HTMLSelectElement>) => {
        try {
            setSelectedValue(event.target.value);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="genre_box">
            <div className="genre_sort">
                <select onChange={SortClick} value={selectedValue}>
                    <option value="popularityDesc">인기도 내림차순</option>
                    <option value="popularityAsc">인기도 오름차순</option>
                    <option value="dateDesc">상영일 내림차순</option>
                    <option value="dateAsc">상영일 오름차순</option>
                </select>
            </div>
        </div>
    )
}

export default GenreSortSelect;