import { MockedProvider } from "@apollo/client/testing";
import { render, waitFor } from "@testing-library/react";
import {BrowserRouter as Router} from 'react-router-dom'
import React from "react";
import { Header } from "../header";
import {MEQUERY} from '../hooks/useMe'


describe("<Header />", () => {
    it("renders Ok", async() => {
        await waitFor(async () => {
            render(
                <MockedProvider mocks={
                    [
                        {
                            request: {
                                query:  MEQUERY
                            },
                            result: {
                                data: {
                                    me: {
                                        id: '1',
                                        email: "test@email.com",
                                        role: "Host",
                                        __typename: 'User',
                    
                                    }
                                }
                            }
                        }
                    ]
                }>
                    <Router>
                        <Header />
                    </Router>
                </MockedProvider>
            )
            await new Promise((resolve) => setTimeout(resolve, 0));
        })
    })
})