import { render, screen } from "@testing-library/react";
import Heading from "../pages/detail/heading";
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter } from "react-router-dom";
import { exaData } from "../utils/constants";

// Redux mock store'u yapılandır
const mockStore = configureMockStore([thunk]);

test("store'daki veri yükleme durumundayken ekrana basılır", () => {
    // Store'u oluştur
    const store = mockStore({ isLoading: true, error: null, data: null });
    
    // Bileşeni render et
    render(
        <Provider store={store}>
            <BrowserRouter>
                <Heading />
            </BrowserRouter>
        </Provider>
    );

    // Loader bileşeninin ekrana basıldığını kontrol et
    expect(screen.getByTestId("heading-loader")).toBeInTheDocument();
});

test("store'daki veri yüklendikten sonra ekrana ülke bilgileri basılır.", () => {
    // Store'u oluştur
    const store = mockStore({
        isLoading: false, 
        error: null, 
        data: exaData, 
    });

    // Bileşeni render et
    render(
        <Provider store={store}>
            <BrowserRouter>
                <Heading />
            </BrowserRouter>
        </Provider>
    );

    // Ülke bayrağının ekrana geldiğini kontrol et
    const flagImg = screen.getByAltText(/The flag of Turkey/);

    // Bayrağın kaynağının doğru olduğunu kontrol et
    expect(flagImg).toHaveAttribute(
        "src",
        "https://flagcdn.com/w320/tr.png"
    );
    
    // Ülke isminin ekrana geldiğini kontrol et
    expect(screen.getByText("Turkey")).toBeInTheDocument();
});
