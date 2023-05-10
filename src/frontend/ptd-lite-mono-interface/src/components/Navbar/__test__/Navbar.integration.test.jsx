import { render, screen, waitFor } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import { vi } from "vitest";
import Navbar from "../Navbar";

vi.mock("@auth0/auth0-react");

describe("The Application Component in logged out state", () => {

    beforeEach(() => {
      useAuth0.mockReturnValue({
        loginWithRedirect: vi.fn(),
      });
    });
  
    afterEach(() => {
        vi.clearAllMocks();
    });
  
    test('When the app starts it renders a log in button', () => {
      render(<Navbar />);
      const loginElement = screen.getByText("Login");
      expect(loginElement).toBeInTheDocument();
    });
  
    test('It redirects the user to the Auth0 Universal Login page when the Log In button is pressed', async () => {
      const { loginWithRedirect } = useAuth0();
  
      render(<Navbar />);
      const loginElement = screen.getByText("Login");
      loginElement.click();
  
      // Expect that if we click the "Log In" button, the loginWithRedirect function gets called
      await waitFor(() => expect(loginWithRedirect).toHaveBeenCalledTimes(1));
    });
  });

  describe("The Application Component in logged in state", () => {
    beforeEach(() => {
      useAuth0.mockReturnValue({
        isAuthenticated: true,
        user: {
          name: "Juan",
          email: "jc@example.com",
          picture: "https://avatar.com",
        },
      });
    });
  
    afterEach(() => {
      vi.clearAllMocks();
    });
  
    test('When the user is authenticated logout button is displayed', () => {
      render(<Navbar />);
      const logoutElement = screen.getByText("Logout");
      expect(logoutElement).toBeInTheDocument();
    });
  });