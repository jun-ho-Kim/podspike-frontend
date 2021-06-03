import { render } from '@testing-library/react';
import React from 'react';
import { Button } from '../button';

describe("<Button />", () => {
    it("should render OK with props", () => {
        const {getByText} = render(<Button loading={false} canClick={true} text={"text"} />)
        getByText("text");
    })
    it("should loading", () => {
        const {getByText, container} = render(<Button loading={true} canClick={false} text={"text"} />)
        getByText("Loading...");
        expect(container.firstChild).toHaveClass("text-white")
    })
})