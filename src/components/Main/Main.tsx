import React, { useState } from 'react';
import dummydata from '../../data/celebrities.json';
import AccordionCard from './AccordionCard';
import AccordionEditCard from './AccordionEditCard';

interface Celebrity {
    id: number;
    picture: string;
    first: string;
    last: string;
    dob: string;
    gender: string;
    country: string;
    description: string;
}

function Main(): JSX.Element {
    const [data, setData] = useState<Celebrity[]>(dummydata);
    const [filteredData, setFilteredData] = useState<Celebrity[]>(dummydata);
    const [activeId, setActiveId] = useState<number>(0);
    const [editId, setEditId] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);

    function toggleAccordion(id: number) {
        if (editId != 0) {   // if in editing mode dont alow to open other accordion
            alert("First save the changes")
            return;
        }
        setActiveId(id);

    }

    function calculateAge(dateOfBirth: string): number {  // get age from birthdate
        const today = new Date();
        const birthDate = new Date(dateOfBirth);

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }

    function handleSearch(event: React.ChangeEvent<HTMLInputElement>): void { //search funtion
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        setActiveId(0);
        const filteredData = data.filter(
            (item) =>
                item.first.toLowerCase().includes(query) ||
                item.last.toLowerCase().includes(query)
        );
        setFilteredData(filteredData);
    }

    function handleDelete(): void {  // open delete confirmation
        setShowDeleteConfirmation(true);
    }

    function confirmDelete(): void {  // delete the user
        const tempData = data.filter((item) => item.id !== activeId) // remove the user acc to id
        setData(tempData); // update the main data
        setFilteredData(tempData); // update filtered data also
        setSearchQuery('');  // clear search query after deleting user
        setShowDeleteConfirmation(false); // close the confirmation
    }

    function getUpdatedDoB(dob: string, age: number): string {  //get new dob from updated age
        const realAge = calculateAge(dob);
        const ageDiff =  realAge - age;
        const [year, month, day] = dob.split("-");
        const newYear = parseInt(year) + ageDiff;
        return newYear + "-" + month + "-" + day;
    }

    function handleSaveChanges(userInfo: any): void {  //save the edit
        const [first, last] = userInfo.name.split(" ");

        // const newDob = getUpdatedDoB()

        const UpdatedData = data.map((item) => item.id === userInfo.id ? {
            ...item,
            first,
            last: last ? last : "",
            dob: getUpdatedDoB(item.dob, userInfo.age),
            gender: userInfo.gender,
            country: userInfo.country,
            description: userInfo.desc,
        } : { ...item });
        console.log(UpdatedData);
        setData(UpdatedData);
        setFilteredData(UpdatedData);
        // setActiveId(0);
        setSearchQuery('');
    }

    return (
        <div className='relative w-full md:w-2/3 lg:w-1/3 mx-auto flex flex-col items-center '>
            <div className='w-full mx-auto mb-6'>
                <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-solid border-slate-400 border-2">
                    <div className="grid place-items-center h-full w-12 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                        type="text"
                        id="search"
                        placeholder="Search user.."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            <div className='w-full flex flex-col space-y-4'>
                {filteredData.map((item: Celebrity, i: number) => (
                    item.id === editId ? (<AccordionEditCard
                        key={i}
                        Id={item.id}
                        Img={item.picture}
                        Name={item.first + ' ' + item.last}
                        Age={calculateAge(item.dob)}
                        Gender={item.gender}
                        Country={item.country}
                        Desc={item.description}
                        IsActive={activeId === item.id}
                        SetActive={toggleAccordion}
                        EditUser={setEditId}
                        UpdateChanges={handleSaveChanges}
                    />) :
                        (<AccordionCard
                            key={i}
                            Id={item.id}
                            Img={item.picture}
                            Name={item.first + ' ' + item.last}
                            Age={calculateAge(item.dob)}
                            Gender={item.gender}
                            Country={item.country}
                            Desc={item.description}
                            IsActive={activeId === item.id}
                            SetActive={toggleAccordion}
                            DeleteUser={handleDelete}
                            EditUser={setEditId}
                        />)
                ))}
            </div>


            {
                showDeleteConfirmation &&
                <div className='fixed top-0 bg-black bg-opacity-50 w-full h-screen'>
                    <div
                        className={`flex flex-col justify-between h-48 w-1/3 top-1/2 absolute -translate-y-1/2 left-1/2 -translate-x-1/2 overflow-hidden transition-all duration-300 items-center border-gray-400 border px-4 pt-2 pb-4 rounded-lg bg-white`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                            onClick={() => setShowDeleteConfirmation(false)}
                            className="w-6 h-6 absolute right-4 top-5 cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>

                        <span className='w-full text-left mt-4 ml-6 text-lg'>Are you sure you want to delete?</span>
                        <div className='w-full flex flex-row space-x-4 justify-end'>
                            <button onClick={() => setShowDeleteConfirmation(false)} className="block w-full md:inline-block md:w-auto px-6 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-lg mt-4
          md:mt-0 md:order-1">Cancel</button>
                            <button onClick={() => confirmDelete()} className="block w-full md:inline-block md:w-auto px-6 py-3 md:py-2 bg-red-600 text-white rounded-lg font-semibold text-lg mt-4
          md:mt-0 md:order-1">Delete</button>
                        </div>
                    </div>
                </div>
            }



        </div>
    );
}

export default Main;
