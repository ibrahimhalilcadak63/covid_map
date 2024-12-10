import { render, screen } from "@testing-library/react";
import Loader from "../components/Loader"; // 

it("Heading için doğru loader ekrana basılır", () => {
    render(<Loader type="heading" />);
    
    const headingLoader = screen.getByTestId("heading-loader");
    expect(headingLoader).toBeInTheDocument(); 
});

it("Diğer alanlar için doğru loader ekrana basılır", () => {
    render(<Loader />);
    // "content-loader" test ID'sine sahip elemanları al
    const loaders = screen.getAllByTestId("content-loader");
    expect(loaders.length).toBe(16); // Toplamda 16 tane loader olması gerektiğini test et
});
