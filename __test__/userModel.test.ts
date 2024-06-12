import { getNextUserId } from "../src/models/userModel";

describe("getNextUserId", (): void => {
  test("getNextUserId shoud return the next user id starting from 3", () => {
    expect(getNextUserId()).toBe(3);
    expect(getNextUserId()).toBe(4);
    expect(getNextUserId()).toBe(5);
  });
});

