import { useMutation, gql, useQuery } from "@apollo/client";
import axios from "axios";
import { stringify } from "querystring";
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory, useParams } from 'react-router-dom';
import { Button } from "../../components/button";
import { deletePodcastMutation } from "../../__generated__/deletePodcastMutation";
import { getPodcastQuery } from "../../__generated__/getPodcastQuery";

interface IParam {
    id: string;
}

export const DELETEPODCAST_MUTATION = gql`
    mutation deletePodcastMutation($input: PodcastSearchInput!) {
        deletePodcast(input: $input) {
            ok
            error
        }
    }
`;

export const GETPODCAST_QUERY = gql`
    query getPodcastQuery($input: GetPodcastInput!) {
        getPodcastOne(input: $input) {
            ok
            error
            podcast {
                id
                title
                thumbnail
            }
        }
    }
`;


export const DeletePodcast = () => {
    // const [thumbnail, setThumbanil] = useState();
    let fileUrl: any;
    let split: any;
    const {id} = useParams<IParam>();
    const history = useHistory();
    const { formState } = useForm({
        mode: "onChange"
    });
    const onCompleted = async (data: getPodcastQuery) => {
        try {
            const {
                getPodcastOne: {podcast}
            } = data;
            
            split = JSON.stringify(podcast?.thumbnail?.split('com/')[1])
            console.log("spolit", split)
            fileUrl = {
               url :  podcast?.thumbnail?.split('com/')[1]
            };
            // fileUrl = JSON.stringify(fileUrl)
            console.log("deleteFile", podcast?.thumbnail);
            console.log("thumbnail",fileUrl);
            // const {url} = await (await fetch('https://podspike.herokuapp.com/uploads', {
            //     method: "DELETE",
            //     body: fileUrl
            // })
            // ).json();
            
  

        } catch(error) {
            console.log(error);
        }
    };
    
    
    const [deletePodcast, {data, loading, error}] = useMutation(DELETEPODCAST_MUTATION, {
        variables: {
            input: {
                id: +id
            }
        }
    });
    
    const {data: podcastData, loading: podcastLoading} = useQuery<getPodcastQuery>(GETPODCAST_QUERY, {
        onCompleted,
        variables: {
            input: {
                id: +id
            }
        }
    });
    
    
    
    const handleOnSubmit = async (event: any) => {
        // setThumbanil(thumbnail)
        event.preventDefault();
        try {
            await axios.delete(`http://localhost:4000/uploads`, {
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
            history.push("/")
        }
    }
    return(
        <div>
            <form onSubmit={handleOnSubmit}> 
                <Button canClick={formState.isValid} loading={loading}  text="삭제하시겠습니까?" />
            </form>
        </div>
    )
}

////팟캐스트 삭제 후 history.push("/") 가 작동 안됨