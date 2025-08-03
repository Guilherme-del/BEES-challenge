import { Navbar } from "./Navbar";
import { render, fireEvent } from "@testing-library/react";
import useStore from "stores/useStore";
import "@testing-library/jest-dom";

// Mock do useNavigate do react-router-dom
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

// Mock do estado inicial
const mockState = {
  isLoading: false,
  fullName: "John Doe",
  companies: [],
};

describe("Navbar", () => {
  beforeEach(() => {
    useStore.setState(mockState);
  });

  const createNavbarComponent = () => {
    return {
      ...render(<Navbar />),
    };
  };

  it("should show all correctly images and texts", () => {
    const { getByTestId, getByText } = createNavbarComponent();

    // Verifica se a imagem está com o src e alt corretos
    expect(getByTestId("go-back-image")).toHaveAttribute("src", "/images/back_arrow.svg");
    expect(getByTestId("go-back-image")).toHaveAttribute("alt", "Go Back - Icon");

    // Verifica a saudação com o primeiro nome
    getByText(`Hi, ${mockState.fullName.split(" ")[0]}`); // "Hi, John"
  });

  it("should call the mockedUsedNavigate correctly", async () => {
    const { getByText } = createNavbarComponent();

    // Simula clique no botão "Logout"
    fireEvent.click(getByText("Logout", { exact: true }));

    // Verifica se o navigate foi chamado corretamente
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
  });
});
