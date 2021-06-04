// import { ApolloProvider } from '@apollo/client';
import { createMockClient, MockApolloClient } from 'mock-apollo-client';
import React from 'react';
import { render, RenderResult, waitFor } from '@testing-library/react';
import Home from '../home';
import { MockedProvider } from '@apollo/client/testing';
import { GETPODCAST_QUERY } from "../home"
import { Podcast } from '../Detailpodcast';
import {BrowserRouter as Router} from 'react-router-dom'

describe("<Home />", () => {
    beforeEach(async() => {
        await waitFor(async() => {
            render(
                <MockedProvider mocks={
                    [
                        {
                            request: {
                                query: GETPODCAST_QUERY
                            },
                            result: {
                                data: {
                                    getPodcast: {
                                        ok: true,
                                        error: null,
                                        podcast:
                                    [
                                        {
                                            id: 1,
                                            title: "test title",
                                            category: "test category",
                                            description: "test desc",
                                            thumbnail: "test thumbnail",
                                            __typename: "Podcast",
                                        }
                                    ],
                                    }
                                }
                            }
                        }
                    ]
                }>
                    <Router>
                        <Home />
                    </Router>
                </MockedProvider>
            )
            await new Promise((resolve) => setTimeout(resolve, 0));
        })
    })
    it("render OK", () => {
        expect(document.title).toBe("홈 | Podspike")
    });
    it("render Home Data", async() => {

    })
})