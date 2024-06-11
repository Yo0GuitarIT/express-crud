export interface User {
  id: number;
  name: string;
  email: string;
}

export const users: User[] = [
  { id: 1, name: "andy", email: "andy@test.com" },
  { id: 2, name: "leo", email: "leo@test.com" },
];

export const getNextUserId = (() => {
  let nextUserId = 3;
  return () => nextUserId++;
})();
