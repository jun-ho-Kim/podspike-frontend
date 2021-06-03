import { render } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { NotFount } from "../404";


describe("<404 />", () => {
    it("render 404 Page", () => {
        const {getByText} = render(
            <Router>
                <NotFount />
            </Router>
        )
        getByText("Page Not Found");
        getByText("존재하지 않는 페이지 입니다.");
    })
})