import { MockedProvider } from "@apollo/client/testing";
import { render, waitFor } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Podcast } from "../Detailpodcast";
import {PODCAST_QUERY} from "../Detailpodcast"

describe("<DetailPodcast />", () => {
    it("render OK with Prps", async() => {
        await waitFor(async() => {
            render(
                <MockedProvider mocks={
                    [
                        {
                            request: {
                                query: PODCAST_QUERY
                            },
                            result: {
                                data: {
                                    getPodcastOne: {
                                        id: "1",
                                        title: "test title",
                                        description: "test des",
                                        thumbnail: "test thumbnail",
                                        category: "test cate"
                                    }
                                }
                            }
                        }
                    ]
                }>
                    <Router>
                        <Podcast />
                    </Router>
            </MockedProvider>
            )
            await new Promise((resolve) => setTimeout(resolve, 0));
        })
    })
})