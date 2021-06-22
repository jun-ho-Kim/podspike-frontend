import { useMutation, gql, useQuery } from "@apollo/client";
import axios from "axios";
import { stringify } from "querystring";
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory, useParams } from 'react-router-dom';
import { Button } from "../../components/button";
import { deleteEpisode_Mutation } from "../../__generated__/deleteEpisode_Mutation";


export const DELETEPODCAST_MUTATION = gql`
mutation deletePodcastMutation($input: PodcastSearchInput!) {
    deletePodcast(input: $input) {
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


export const DeletePodcast = () => {
    // const [thumbnail, setThumbanil] = useState();
    const [popup, setPopup] = useState(false);
    let fileUrl: any;
    let split: any;
    const {id} = useParams<IParam>();
    const history = useHistory();
    const { formState } = useForm({
        mode: "onChange"
    });

    const handleOnDeletePopup = () => {
        setPopup(!popup);
    }

    const cancelPopup = () => {
        setPopup(false)
    }

    // const onCompleted = async (data: getPodcastQuery) => {
    //     try {
    //         const {
    //             getPodcastOne: {podcast}
    //         } = data;
            
            // split = JSON.stringify(podcast?.thumbnail?.split('com/')[1])
            // console.log("spolit", split)
            // fileUrl = {
            //    url :  podcast?.thumbnail?.split('com/')[1]
            // };
            // fileUrl = JSON.stringify(fileUrl)
            // console.log("deleteFile", podcast?.thumbnail);
            // console.log("thumbnail",fileUrl);
            // const {url} = await (await fetch('https://podspike.herokuapp.com/uploads', {
            //     method: "DELETE",
            //     body: fileUrl
            // })
            // ).json();
    //     } catch(error) {
    //         console.log(error);
    //     }
    // };

    const onCompleted = (data: deleteEpisode_Mutation) => {
        const {
             deleteEpisode: {ok}
        } = data;
        if(ok) {
            history.push('/');
        }
    }
    
    
    const [deletePodcast, {data, loading, error}] = useMutation(DELETEPODCAST_MUTATION, {
        onCompleted,
        variables: {
            input: {
                id: +id
            }
        }
    });
    
    // const {data: podcastData, loading: podcastLoading} = useQuery<getPodcastQuery>(GETPODCAST_QUERY, {
    //     onCompleted,
    //     variables: {
    //         input: {
    //             id: +id
    //         }
    //     }
    // });
    
    
    
    const handleOnSubmit = async (event: any) => {
        // event.preventDefault();
        await deletePodcast();
        try {
            await axios.delete(`https://podspike.herokuapp.com/uploads`, {
                data: fileUrl
            })
            .then(response => {
                console.log("response", response)
                if(response.status === 200) {
                    console.log("200 ok")
                }
            })
            
            // const formData = new FormData()
            // formData.append("file", )
            // await deletePodcast();
            // await axios.delete("https://podspike.herokuapp.com/uploads", fileUrl)
            // .then(response => {
            //     console.log("response", response)
            // })
            // .then(error => {
            //     console.log("error",error)
            // })
            
        } catch(error) {
            console.log("delete error", error);
        } finally {
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
}

////팟캐스트 삭제 후 history.push("/") 가 작동 안됨