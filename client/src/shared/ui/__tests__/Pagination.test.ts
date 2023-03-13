import { getPages } from "../Pagination/Pagination.helpers";
import { randomNumbers } from "../../test/generate";

test("shows no more than 9 page buttons", () => {
  const currentPage = 1;
  const totalPages = randomNumbers(15);

  for (let i = 0; i < totalPages.length; i++) {
    const pages = getPages(currentPage, totalPages[i]);

    expect(pages.length).toBeLessThan(10);
  }
});

test("the first button always points to the first page", () => {
  const currentPage = 1;
  const totalPages = randomNumbers(15);

  for (let i = 0; i < totalPages.length; i++) {
    const pages = getPages(currentPage, totalPages[i]);

    expect(pages[0].page).toEqual(1);
  }
});

test("the last button always points to the last page", () => {
  const currentPage = 1;
  const totalPages = randomNumbers(15);

  for (let i = 0; i < totalPages.length; i++) {
    const pages = getPages(currentPage, totalPages[i]);

    expect(pages[pages.length - 1].page).toEqual(totalPages[i]);
  }
});
