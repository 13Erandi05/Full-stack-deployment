import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import App from "./App";

jest.mock("axios");

describe("App component", () => {
  test("fetches and displays items", async () => {
    const items = [{ name: "Item 1" }, { name: "Item 2" }];
    axios.get.mockResolvedValue({ data: items });

    render(<App />);

    await waitFor(() => {
      items.forEach((item) => {
        expect(screen.getByText(item.name)).toBeInTheDocument();
      });
    });
  });

  test("adds a new item", async () => {
    const items = [{ name: "Item 1" }];
    const newItem = { name: "New Item" };
    axios.get.mockResolvedValue({ data: items });
    axios.post.mockResolvedValue({ data: newItem });

    render(<App />);

    await waitFor(() => {
      items.forEach((item) => {
        expect(screen.getByText(item.name)).toBeInTheDocument();
      });
    });

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: newItem.name },
    });
    fireEvent.click(screen.getByText("Add Item"));

    await waitFor(() => {
      expect(screen.getByText(newItem.name)).toBeInTheDocument();
    });
  });
});
