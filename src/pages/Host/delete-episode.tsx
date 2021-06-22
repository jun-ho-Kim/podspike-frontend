import { useMutation, gql, useQuery } from "@apollo/client";
import axios from "axios";
import { stringify } from "querystring";
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory, useParams } from 'react-router-dom';


export const DELETEEISODE_MUTATION = gql`
mutation deleteEpisode_Mutation($input: EpisodeSearchInput!) {
    deleteEpisode(input: $input) {
        ok
        error
    }
}
`;

interface DeletePopupProps {
    popup: boolean | null;
    cancelPopup: any;
    handleOnSubmit: any;
}

export const DeletePopupMenu: React.FC<DeletePopupProps> = ({popup, cancelPopup, handleOnSubmit}) => {
    return (
        <div className='absolute top-0 flex mt-16 '>
            <div className=''>
                {popup === true &&
                <div className='py-6 px-3 bg-blue-200 rounded-md'>
                    <p>
                        해당 방송을 삭제하겠습니까?
                    </p>
                    <div className='mt-3 flex justify-center'>
                        <span 
                            className='mr-5 hover:text-white'
                            onClick={handleOnSubmit}>
                                확인
                        </span>
                        <span
                            className='hover:text-white' 
                            onClick={cancelPopup}>취소</span>
                    </div>
                </div>
                }
            </div>
            
        </div>
    )
}

interface IParam {
    id: string;
}


export const DeleteEpisode = () => {
    const [popup, setPopup] = useState(false);
    let fileUrl: any;
    const {id} = useParams<IParam>();
    const history = useHistory();

    const handleOnDeletePopup = () => {
        setPopup(!popup);
    }

    const cancelPopup = () => {
        setPopup(false)
    }

    const [deleteEpisode, {data, loading, error}] = useMutation(DELETEEISODE_MUTATION, {
        variables: {
            input: {
                id: +id
            }
        }
    });

    const handleOnSubmit = async (event: any) => {
        // event.preventDefault();
        await deleteEpisode();
        try {
            await axios.delete(`http://podspike.herokuapp.com/uploads`, {
                data: fileUrl
            })
            .then(response => {
                console.log("response", response)
                if(response.status === 200) {
                    console.log("200 ok")
                }
            })
        } catch(error) {
            console.log("delete error", error);
        } finally {
            history.push("/");
        }
    }
    return(
        <div className='flex justify-center items-center mt-20 relative'>
                <button
                    onClick={handleOnDeletePopup}
                    className='py-5 px-3 rounded-3xl bg-blue-400 hover:text-white'
                >
                    삭제하시겠습니까?
                </button>
                <DeletePopupMenu 
                    popup={popup}
                    cancelPopup={cancelPopup}
                    handleOnSubmit={handleOnSubmit}
                />
        </div>
    )
};