import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Error from "../components/error";

it("Gönderilen hata mesajı ekrana basılıyor mu?", () => {
    render(<Error message="404 not found" />);
    screen.getByText(/404/);
});

it("Tekrar dene butonu işlevini yapıyor mu?", async () => {
    // test edilebilir fonksiyon oluştur.
    const retryMock = jest.fn();

    // Bileşeni renderla
    render(<Error message="404 not found" retry={retryMock}/>);

    // Button'u al
    const button = screen.getByRole("button");

    // butona tıkla
    await userEvent.click(button);

    // Fonksiyon çalıştı mı?
    expect(retryMock).toHaveBeenCalled();
});
