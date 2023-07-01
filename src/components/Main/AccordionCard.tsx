import React from 'react';

interface AccordionCardProps {
    Id: number;
    Img: string;
    Name: string;
    Age: number;
    Gender: string;
    Country: string;
    Desc: string;
    IsActive: boolean;
    SetActive: (id: number) => void;
    DeleteUser: (id: number) => void;
    EditUser: (id: number) => void;
}

const AccordionCard: React.FC<AccordionCardProps> = ({
    Id,
    Img,
    Name,
    Age,
    Gender,
    Country,
    Desc,
    IsActive,
    SetActive,
    DeleteUser,
    EditUser
}) => {

    function handleEdit() : void{
        if (Age < 18) {                 // edit only adults information
            alert("Can only edit Adult's Information");
        }
        else EditUser(Id);
    }

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
                        <h2 className="text-gray-900 title-font font-medium">{Name}</h2>
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
                <div className="w-full flex flex-row justify-between px-2 my-4">
                    <div className="flex flex-col text-lg">
                        <h1 className="text-slate-500 ">Age</h1>
                        <p>{Age} Years</p>
                    </div>
                    <div className="flex flex-col text-lg">
                        <h1 className="text-slate-500 ">Gender</h1>
                        <p>{Gender}</p>
                    </div>
                    <div className="flex flex-col text-lg">
                        <h1 className="text-slate-500 ">Country</h1>
                        <p>{Country}</p>
                    </div>
                </div>
                <div className="w-full px-2 my-4">
                    <div className="flex flex-col text-lg">
                        <h1 className="text-slate-500 ">Description</h1>
                        <p className='overflow-y-scroll h-44'>{Desc}</p>
                    </div>
                </div>

                <div className="w-full flex flex-row justify-end space-x-4 ">
                    <svg
                        onClick={() => DeleteUser(Id)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-red-500 cursor-pointer"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                    </svg>
                    <svg
                        onClick={()=>handleEdit()}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-[1.4rem] h-6 text-blue-500 cursor-pointer"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                    </svg>
                </div>
        </div>

    );
};

export default AccordionCard;
