import React, { useState, useEffect } from 'react';

interface AccordionEditCardProps {
    Id: number;
    Img: string;
    Name: string;
    Age: number;
    Gender: string;
    Country: string;
    Desc: string;
    IsActive: boolean;
    SetActive: (id: number) => void;
    EditUser: (id: number) => void;
    UpdateChanges: (userInfo: any) => void;

}

const AccordionEditCard: React.FC<AccordionEditCardProps> = ({
    Id,
    Img,
    Name,
    Age,
    Gender,
    Country,
    Desc,
    IsActive,
    SetActive,
    EditUser,
    UpdateChanges
}) => {

    const [name, setName] = useState<string>(Name);
    const [age, setAge] = useState<number>(Age);
    const [gender, setGender] = useState<string>(Gender);
    const [country, setCountry] = useState<string>(Country);
    const [desc, setDesc] = useState<string>(Desc);
    const [disableSave, setDisableSave] = useState<boolean>(true);

    const countryChangeValidation = (event: React.ChangeEvent<HTMLInputElement>) => { // dont allow numbers in country
        const value = event.target.value;

        // Remove any numbers from the input value
        const textValue = value.replace(/[0-9]/g, '');

        setCountry(textValue);
    };

    const handleSave = () => {  //validate and save
        if (name === Name && age === Age && gender === Gender && country === Country && desc === Desc) {
            return;
        }
        if (Number.isNaN(age) || name === "" || country === "" || desc === "") {
            alert("Fields cannot be empty");
            return;
        }
        console.log("saved")

        UpdateChanges({
            id: Id,
            name,
            age,
            gender,
            country,
            desc
        })
        
        EditUser(0);
    }

    useEffect(() => {  // if any info is changed enable the save button or else disable
        if (!(name === Name && age === Age && gender === Gender && country === Country && desc === Desc)) {
            setDisableSave(false);
        }
        else setDisableSave(true);
    }, [name, age, gender, country, desc])


    return (
        <div
            className={`${IsActive ? 'h-[27rem]' : 'h-20'
                } overflow-hidden transition-all duration-300 w-full flex flex-col items-center border-gray-400 border px-4 pt-2 pb-4 rounded-lg`}
        >
            <div className="w-full flex flex-row items-center justify-between">
                <img
                    alt="team"
                    className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                    src={Img}
                />
                <div className="flex-grow">
                    <input className="text-gray-900 title-font font-medium border border-3 border-gray-400 rounded-lg p-3" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => SetActive(IsActive ? 0 : Id)}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-6 h-6 transition-all cursor-pointer ${IsActive ? "" : 'rotate-180'}`}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                    />
                </svg>
            </div>
            <div className="w-full flex flex-row justify-between px-2 my-4 space-x-2">
                <div className="flex flex-col text-lg">
                    <h1 className="text-slate-500 ">Age</h1>
                    <p><input type='number' min={1} className="w-16 text-gray-900 title-font font-medium border border-3 border-gray-400 rounded-lg px-2 py-0.5" value={age} onChange={(e) => setAge(parseInt(e.target.value, 10))} /> Years</p>
                </div>
                <div className="flex flex-col text-lg">
                    <h1 className="text-slate-500 ">Gender</h1>
                    <select className='border border-3 border-gray-400 rounded-lg px-2 py-[0.25rem] w-[8.5rem]' value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Transgender</option>
                        <option>Rather not say</option>
                        <option>Other</option>
                    </select>
                </div>
                <div className="flex flex-col text-lg">
                    <h1 className="text-slate-500 ">Country</h1>
                    <input pattern="[^0-9]*" type='text' className='w-36 border border-3 border-gray-400 rounded-lg px-2 py-0.5' value={country} onChange={countryChangeValidation} />
                </div>
            </div>
            <div className="w-full px-2 my-3">
                <div className="flex flex-col text-lg">
                    <h1 className="text-slate-500 ">Description</h1>
                    <textarea className='overflow-y-scroll h-44 w-full border border-3 border-gray-400 rounded-lg p-2' value={desc} onChange={(e) => setDesc(e.target.value)} />
                </div>
            </div>

            <div className="w-full flex flex-row justify-end space-x-2 ">
                <svg onClick={() => EditUser(0)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-red-500 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                <svg onClick={() => handleSave()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-7 h-7 text-green-500 ${disableSave ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

            </div>
        </div>

    );
};

export default AccordionEditCard;
