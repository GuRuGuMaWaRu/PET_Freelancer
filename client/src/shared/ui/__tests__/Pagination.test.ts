import { getPages } from "../Pagination/Pagination.helpers";
import { randomNumbers } from "../../test/generate";

describe("getPages", () => {
  test("shows no more than 9 page buttons", () => {
    const currentPage = 1;
    const totalPages = randomNumbers(15);

    for (let i = 0; i < totalPages.length; i++) {
      const pages = getPages(currentPage, totalPages[i]);

      expect(pages.length).toBeLessThan(10);
    }
  });

  test("has its first button always pointing to the first page", () => {
    const currentPage = 1;
    const totalPages = randomNumbers(15);

    for (let i = 0; i < totalPages.length; i++) {
      const pages = getPages(currentPage, totalPages[i]);

      expect(pages[0].page).toEqual(1);
    }
  });

  test("has its last button always pointing to the last page", () => {
    const currentPage = 1;
    const totalPages = randomNumbers(15);

    for (let i = 0; i < totalPages.length; i++) {
      const pages = getPages(currentPage, totalPages[i]);

      expect(pages[pages.length - 1].page).toEqual(totalPages[i]);
    }
  });

  test("returns correct page numbers if totalPages is less than or equal to 9", () => {
    const currentPage = 1;
    const totalPages = randomNumbers(9);

    for (let i = 0; i < totalPages.length; i++) {
      const pages = getPages(currentPage, totalPages[i]);
      const expectedPages = Array.from({ length: pages.length }, (_, idx) => ({
        page: idx + 1,
      }));

      expect(pages).toEqual(expectedPages);
    }
  });

  describe("returns correct page numbers if totalPages is more than 9", () => {
    test("and currentPage is less than or equal 5", () => {
      expect(getPages(5, 10)).toEqual([
        { page: 1 },
        { page: 2 },
        { page: 3 },
        { page: 4 },
        { page: 5 },
        { page: 6 },
        { page: 7 },
        { page: 8, next_previous: true },
        { page: 10 },
      ]);

      expect(getPages(3, 13)).toEqual([
        { page: 1 },
        { page: 2 },
        { page: 3 },
        { page: 4 },
        { page: 5 },
        { page: 6 },
        { page: 7 },
        { page: 8, next_previous: true },
        { page: 13 },
      ]);
    });

    test("and currentPage is more than 5 and less than totalPages - 4", () => {
      expect(getPages(6, 77)).toEqual([
        { page: 1 },
        { page: 3, next_previous: true },
        { page: 4 },
        { page: 5 },
        { page: 6 },
        { page: 7 },
        { page: 8 },
        { page: 9, next_previous: true },
        { page: 77 },
      ]);

      expect(getPages(66, 177)).toEqual([
        { page: 1 },
        { page: 63, next_previous: true },
        { page: 64 },
        { page: 65 },
        { page: 66 },
        { page: 67 },
        { page: 68 },
        { page: 69, next_previous: true },
        { page: 177 },
      ]);

      expect(getPages(372, 377)).toEqual([
        { page: 1 },
        { page: 369, next_previous: true },
        { page: 370 },
        { page: 371 },
        { page: 372 },
        { page: 373 },
        { page: 374 },
        { page: 375, next_previous: true },
        { page: 377 },
      ]);
    });

    test("and currentPage is between totalPages - 4 and totalPages", () => {
      expect(getPages(73, 77)).toEqual([
        { page: 1 },
        { page: 70, next_previous: true },
        { page: 71 },
        { page: 72 },
        { page: 73 },
        { page: 74 },
        { page: 75 },
        { page: 76 },
        { page: 77 },
      ]);

      expect(getPages(177, 177)).toEqual([
        { page: 1 },
        { page: 170, next_previous: true },
        { page: 171 },
        { page: 172 },
        { page: 173 },
        { page: 174 },
        { page: 175 },
        { page: 176 },
        { page: 177 },
      ]);

      expect(getPages(374, 377)).toEqual([
        { page: 1 },
        { page: 370, next_previous: true },
        { page: 371 },
        { page: 372 },
        { page: 373 },
        { page: 374 },
        { page: 375 },
        { page: 376 },
        { page: 377 },
      ]);
    });
  });
});
