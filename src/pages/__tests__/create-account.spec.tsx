import { ApolloProvider } from '@apollo/client';
import { createMockClient, MockApolloClient } from 'mock-apollo-client';
import React from 'react';
import { render, waitFor, RenderResult } from "../../test-utils";
import userEvent from '@testing-library/user-event';
import { UserRole } from '../../__generated__/globalTypes';
import { CreateAccount, CREATEACCOUNT } from '../create-account';

const mockpush = jest.fn()

jest.mock("react-router-dom", () => {
    const realModule = jest.requireActual("react-router-dom");
    return {
        ...realModule,
        useHistory: () => {
            return {
                push: mockpush
            }
        }
    }
})

describe('<CreateAccount />', () => {
    let mockedClient: MockApolloClient;
    let renderResult: RenderResult;
    beforeEach(async() => {
        await waitFor(async() => {
            mockedClient = createMockClient();
            renderResult = render(
                <ApolloProvider client={mockedClient}>
                    <CreateAccount />
                </ApolloProvider>
            )
        });
    });
    it("renders Ok", async() => {
        await waitFor(() => {
            expect(document.title).toBe("회원가입 | Podspike");
        })
    });
    it("renders validtation errors", async() => {
        const { getByPlaceholderText,getAllByText, getByRole} = renderResult;
        const email = getByPlaceholderText(/이메일/i);
        const password = getByPlaceholderText(/^비밀번호$/i);
        const submitBtn = getByRole("button");
        await waitFor(() => {
            userEvent.type(email, "test");
        });
        let errorMessage = getByRole("alert");
        expect(errorMessage).toHaveTextContent(/이메일을 입력해주세요/);
        await waitFor(() => {
            userEvent.clear(email);
        });
        errorMessage = getByRole("alert");
        expect(errorMessage).toHaveTextContent(/이메일을 입력해주세요/);
        await waitFor(() => {
            userEvent.type(email, "test@email.com");
            userEvent.type(password, "12345");
            userEvent.click(submitBtn)
        });
        errorMessage = getByRole("alert");
        expect(errorMessage).toHaveTextContent(/비밀번호를 입력하세요/)
    });
    it("renders validation errors", async() => {
        const { getByPlaceholderText, getByRole, debug } = renderResult;
        const email = getByPlaceholderText(/이메일/i);
        const password = getByPlaceholderText(/^비밀번호$/i);
        const passwordConfirm = getByPlaceholderText(/^비밀번호확인$/i);
        const submitBtn = getByRole("button");
        const formData = {
            email: "test@email.com",
            password: "12345",
            passwordConfirm: "12345",
            role: UserRole.Host,
        }
        const mockedMutationResponse = jest.fn().mockResolvedValue({
            data: {
                createAccount: {
                    ok: true,
                    error: "error",
                }
            }
        });
        mockedClient.setRequestHandler(CREATEACCOUNT, mockedMutationResponse);
        jest.spyOn(window, "alert").mockImplementation(() => null);
        await waitFor(() => {
            userEvent.type(email, formData.email);
            userEvent.type(password, formData.password);
            userEvent.type(passwordConfirm, formData.passwordConfirm);
            userEvent.click(submitBtn);
        });
        expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
        expect(mockedMutationResponse).toHaveBeenCalledWith({
            "createAccountInput": {
              "email": formData.email,
              "password": formData.password,
              "passwordConfirm": formData.passwordConfirm,
              "role": formData.role,
            },
        })
        expect(window.alert).toHaveBeenCalledWith("회원가입에 성공했습니다.");
        expect(mockpush).toHaveBeenCalledWith("/")
        const multationError = getByRole("alert");
        expect(multationError).toHaveTextContent("error");
        afterAll(() => {
            jest.clearAllMocks();
        })
    });
})
