import { Companies } from "./Companies";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import useStore from "stores/useStore";
import mockCompanies from "mocks/mockCompanies.json";
import "@testing-library/jest-dom";

// Mock do useNavigate do React Router
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

// Mock da API
const mockSearchCompaniesByName = jest.fn();
jest.mock("services/api", () => ({
  searchCompaniesByName: (...args: any[]) => mockSearchCompaniesByName(...args),
}));

describe("Companies Page", () => {
  beforeEach(() => {
    useStore.setState({
      favorites: [mockCompanies[0]],
      setFavorites: jest.fn(),
      isLoading: false,
      setIsLoading: jest.fn(),
    });

    mockSearchCompaniesByName.mockReset();
  });

  it("should render favorite companies correctly", () => {
    render(<Companies />);

    expect(screen.getByText("Your favorite breweries")).toBeInTheDocument();
    expect(screen.getByText(mockCompanies[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockCompanies[0].street)).toBeInTheDocument();
  });

  it("should render empty message if no favorites", () => {
    useStore.setState({ favorites: [] });
    render(<Companies />);

    expect(
      screen.getByText("You don’t have any favorite brewery :(")
    ).toBeInTheDocument();
  });

  it("should show search results when search is triggered by button", async () => {
    mockSearchCompaniesByName.mockResolvedValueOnce({ data: [mockCompanies[1]] });

    render(<Companies />);

    const input = screen.getByPlaceholderText("Find for your new favorite brewery");
    const button = screen.getByText("Search");

    fireEvent.change(input, { target: { value: "brewery" } });
    fireEvent.click(button);

    expect(await screen.findByText(mockCompanies[1].name)).toBeInTheDocument();
  });

  it("should show search results when Enter key is pressed", async () => {
    mockSearchCompaniesByName.mockResolvedValueOnce({ data: [mockCompanies[1]] });

    render(<Companies />);

    const input = screen.getByPlaceholderText("Find for your new favorite brewery");

    fireEvent.change(input, { target: { value: "brewery" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(await screen.findByText(mockCompanies[1].name)).toBeInTheDocument();
  });

  it("should show loader when isLoading is true", () => {
    useStore.setState({ isLoading: true });
    render(<Companies />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("should show error component if API fails", async () => {
    mockSearchCompaniesByName.mockRejectedValueOnce(new Error("fail"));

    render(<Companies />);

    const input = screen.getByPlaceholderText("Find for your new favorite brewery");
    const button = screen.getByText("Search");

    fireEvent.change(input, { target: { value: "brewery" } });
    fireEvent.click(button);

    await waitFor(() =>
      expect(
        screen.getByRole("heading", { level: 3 })
      ).toHaveTextContent("An error has occurred")
    );
  });

  it("should load more companies when 'Load More' is clicked", async () => {
    // Primeira página
    mockSearchCompaniesByName.mockResolvedValueOnce({ data: [mockCompanies[1]] });

    render(<Companies />);

    fireEvent.change(
      screen.getByPlaceholderText("Find for your new favorite brewery"),
      { target: { value: "brewery" } }
    );
    fireEvent.click(screen.getByText("Search"));

    expect(await screen.findByText(mockCompanies[1].name)).toBeInTheDocument();

    // Segunda página
    mockSearchCompaniesByName.mockResolvedValueOnce({ data: [mockCompanies[2]] });

    const loadMoreBtn = screen.getByText("Load More");
    fireEvent.click(loadMoreBtn);

    expect(await screen.findByText(mockCompanies[2].name)).toBeInTheDocument();
  });
});
