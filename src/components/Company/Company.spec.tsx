import { Company } from "./Company";
import { ICompany } from "models/Companies";
import { render, screen, fireEvent } from "@testing-library/react";
import useStore from "stores/useStore";
import mockCompany from "mocks/mockCompany.json";
import mockCompanies from "mocks/mockCompanies.json";
import "@testing-library/jest-dom";

const mockState = {
	isLoading: false,
	fullName: "John Doe",
	companies: mockCompanies
};

describe("Company component", () => {
	beforeEach(() => {
		useStore.setState(mockState);
	});

	const renderComponent = (company: ICompany) => {
		render(<Company company={company} />);
	};

	it("should render company address correctly", () => {
		renderComponent(mockCompany);

		expect(screen.getByTestId("company-id")).toHaveTextContent(mockCompany.name);
		expect(screen.getByTestId("company-street")).toHaveTextContent(mockCompany.street);
		expect(screen.getByTestId("company-address")).toHaveTextContent(
			`${mockCompany.city}, ${mockCompany.state} - ${mockCompany.country}`
		);
	});

	it("should render all required tag icons and values", () => {
		renderComponent(mockCompany);

		expect(screen.getByTestId("company-brewery-type-icon")).toHaveAttribute("src", "/images/chart.svg");
		expect(screen.getByTestId("company-brewery-type-icon")).toHaveAttribute("alt", "Chart - Icon");
		expect(screen.getByTestId("company-brewery-type")).toHaveTextContent(mockCompany.brewery_type);

		expect(screen.getByTestId("company-postal-code-icon")).toHaveAttribute("src", "/images/pin.svg");
		expect(screen.getByTestId("company-postal-code-icon")).toHaveAttribute("alt", "Postal - Icon");
		expect(screen.getByTestId("company-postal-code")).toHaveTextContent(mockCompany.postal_code);

		expect(screen.getByTestId("company-phone-icon")).toHaveAttribute("src", "/images/phone.svg");
		expect(screen.getByTestId("company-phone-icon")).toHaveAttribute("alt", "Phone - Icon");
		expect(screen.getByTestId("company-phone")).toHaveTextContent(mockCompany.phone);
	});

	it("should remove company from favorites on delete click", () => {
		renderComponent(mockCompany);

		const initialLength = useStore.getState().companies.length;
		const deleteBtn = screen.getByTestId(`company-delete-${mockCompany.id}`);

		fireEvent.click(deleteBtn);

		const newLength = useStore.getState().companies.length;
		expect(newLength).toBeLessThan(initialLength);
	});
});
