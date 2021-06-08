import { ApolloProvider } from '@apollo/client';
import { createMockClient, MockApolloClient } from 'mock-apollo-client';
import { render, RenderResult, waitFor } from '@testing-library/react';
import React from 'react';
import { Login, LOGIN_MUTATION } from '../login';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import userEvent from '@testing-library/user-event';
import { debug } from 'console';

describe("<Login />", () => {
    let renderResult: RenderResult;
    let mockedClient: MockApolloClient;
    beforeEach(async () => {
        await waitFor(async () => {
            mockedClient = createMockClient();
            renderResult = render(
                <HelmetProvider>
                    <Router>
                        <ApolloProvider client={mockedClient}>
                            <Login />
                        </ApolloProvider>
                    </Router>
                </HelmetProvider>
            )
        })
    });
    it('should render OK', async() => {
        await waitFor(() => {
            expect(document.title).toBe("login | Podspike")
        })
    });
    it("displays email validation errors", async() => {
        const {getByPlaceholderText, debug, getByRole} = renderResult;
        const email = getByPlaceholderText(/이메일/i);
        await waitFor(() => {
            userEvent.type(email, "th");
        })
        const errorMessage = getByRole("alert");
        expect(errorMessage).toHaveTextContent(/이메일을 입력해주세요/i);
        await waitFor(() => {
            userEvent.clear(email);
        });
        expect(errorMessage).toHaveTextContent(/이메일을 입력해주세요/i);
    });
    it("display password validation errors", async() => {
        const {getByPlaceholderText, getByText, getByRole, debug} = renderResult;
        const email = getByPlaceholderText(/이메일/i);
        const password = getByPlaceholderText(/비밀번호/i);
        const submitBtn = getByRole("button");
        const formData = {
            email: "test@email.com",
            password: "12345",
        }
        await waitFor(() => {
            userEvent.type(email, formData.email);
            userEvent.clear(password);
            userEvent.click(submitBtn);
        });
        getByText("비밀번호를 입력해주세요.");
    })
    it("submits form and calls mutaion", async() => {
        const { getByPlaceholderText, getByText, getByRole, debug } = renderResult;
        const email = getByPlaceholderText(/이메일/i);
        const password = getByPlaceholderText(/비밀번호/i);
        const submitBtn = getByRole("button");
        const formData = {
            email: "test@email.com",
            password: "12345",
        };
        const mockedMutationResponse = jest.fn().mockResolvedValue({
            data: {
                login: {
                    ok: true,
                    token: "XXX",
                    error: "error",
                }
            }
        });
        mockedClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);
        jest.spyOn(Storage.prototype, "setItem");
        await waitFor(() => {
            userEvent.type(email, formData.email);
            userEvent.type(password, formData.password);
            userEvent.click(submitBtn);
        })
        expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
        expect(mockedMutationResponse).toHaveBeenCalledWith({
           "loginInput": {
                "email": formData.email,
                "password": formData.password,
            },
        })
        const errorMessage = getByRole('alert');
        expect(errorMessage).toHaveTextContent("error");
        expect(localStorage.setItem).toHaveBeenCalledWith("podspike-token", "XXX")
    });
    
});