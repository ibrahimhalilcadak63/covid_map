import { render, screen } from "@testing-library/react";
import Content from "../pages/detail/content";
import { configureStore } from "redux-mock-store";
import { thunk } from "redux-thunk";


const mockStore = configureStore([thunk]);

test("store yüklenme durumundayken ekrana loader basar", () => {

    // store'un yüklenme durumundaki halini simule ettik.
const store = mockStore({isLoading: true, error: false, data: null});


render(
<Provider>
<Content />
</Provider>

);
// Ekrana loader bileşeni geldi mi?
screen.getByAllTestId("contetnt-loader");
});

test("store hata durumundayken content bileşeni ekrana hatayı basar", () => {
    // store'un hata durumundaki halini simule ettik
    const store = mockStore({ isLoading: false, error: "404 not found", data: null});

    render(
        <Provider store={store}>
            <Content />
        </Provider>
    );

    // ekrana hata bileşeni geldi mi?
    screen.getByText("404 not found");

});

test("store'a veri geldiği senaryoda content bileşeni ekrana kartaları basar", () => {
    const store = mockStore({
        isLoading: false,
        error: null,
        data: exaData,

    });

    render(
        <Provider>
            <Content />
        </Provider>
    );

    // Covid nesnesini diziye çevir
const arr = Object.entries(exaData.covid);
    // Dizideki her bir eleman için ekrana kartlar basılır.
    arr.forEach((item) => {
        // Ekrana başlıklar geldi mi?
        screen.getByTextId(item[0].split("_").join(" "));
        // Ekrana değerler geldi mi?
        screen.getAllByText(item[1]);

    });
});