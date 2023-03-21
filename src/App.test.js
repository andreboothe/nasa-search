import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import App from "./App";
import { BASE_URL, QUERY_REQUIRED_ERROR } from "./constants";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

const fakeCollectionResponse = {
  collection: {
    version: "1.0",
    href: "http://images-api.nasa.gov/search?q=moon&media_type=image",
    items: [
      {
        href: "https://images-assets.nasa.gov/image/PIA12235/collection.json",
        data: [
          {
            center: "JPL",
            title: "Nearside of the Moon",
            nasa_id: "PIA12235",
            date_created: "2009-09-24T18:00:22Z",
            keywords: ["Moon", "Chandrayaan-1"],
            media_type: "image",
            photographer: "Unknown",
            location: "NASA",
            description: "Nearside of the Moon",
            secondary_creator: "ISRO/NASA/JPL-Caltech/Brown Univ.",
            description: "Nearside of the Moon",
          },
        ],
        links: [
          {
            href: "https://images-assets.nasa.gov/image/PIA12235/PIA12235~thumb.jpg",
            rel: "preview",
            render: "image",
          },
        ],
      },
    ],
  },
};
const server = setupServer(
  rest.get(
    "https://images-api.nasa.gov/search?q=moon&media_type=image",
    (req, res, ctx) => {
      return res(ctx.json(fakeCollectionResponse));
    }
  )
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const dataLoadingSetup = async () => {
  render(<App />, { wrapper: BrowserRouter });
  const queryInput = screen.getByTestId(/query-input/i);
  fireEvent.change(queryInput, { target: { value: "moon" } });

  const submitBtn = screen.getByTestId(/submit/i);
  expect(submitBtn).toBeInTheDocument();

  fireEvent.click(submitBtn);
  const loader = screen.getByTestId(/spinner-loader/i);
  await waitForElementToBeRemoved(loader);
  return { screen };
};

test("it should render input fields to screen", () => {
  render(<App />, { wrapper: BrowserRouter });
  const queryInput = screen.getByTestId(/query-input/i);
  const queryYear = screen.getByTestId(/start-year/i);
  const endYear = screen.getByTestId(/end-year/i);
  const submitBtn = screen.getByTestId(/submit/i);
  expect(queryInput).toBeInTheDocument();
  expect(queryYear).toBeInTheDocument();
  expect(endYear).toBeInTheDocument();
  expect(submitBtn).toBeInTheDocument();
});

test("it should render error message when search field is empty and user submits", async () => {
  render(<App />, { wrapper: BrowserRouter });
  const submitBtn = screen.getByTestId(/submit/i);
  expect(submitBtn).toBeInTheDocument();

  fireEvent.click(submitBtn);
  const errorMessage = await screen.getByText(QUERY_REQUIRED_ERROR);
  expect(errorMessage).toBeInTheDocument();
});

test("it should render collection results", async () => {
  const { title, photographer, location } =
    fakeCollectionResponse.collection.items[0].data[0];
  await dataLoadingSetup();

  const titleText = screen.getByText("Title: " + title);
  expect(titleText).toBeInTheDocument();

  const photographerText = screen.getByText("Photographer: " + photographer);
  expect(photographerText).toBeInTheDocument();

  const locationText = screen.getByText("Location: " + location);
  expect(locationText).toBeInTheDocument();

  const linkBtn = screen.getByText("See more details");
  expect(linkBtn).toBeInTheDocument();
});

test("it should render detailed result card info", async () => {
  const { title, photographer, location, date_created } =
    fakeCollectionResponse.collection.items[0].data[0];
  await dataLoadingSetup();

  const linkBtn = screen.getByText("See more details");
  expect(linkBtn).toBeInTheDocument();
  fireEvent.click(linkBtn);

  const titleText = screen.getByText("Title: " + title);
  expect(titleText).toBeInTheDocument();

  const photographerText = screen.getByText("Photographer: " + photographer);
  expect(photographerText).toBeInTheDocument();

  const locationText = screen.getByText("Location: " + location);
  expect(locationText).toBeInTheDocument();

  const dateText = screen.getByText(
    "Date: " + new Date(date_created).toDateString()
  );
  expect(dateText).toBeInTheDocument();
});
