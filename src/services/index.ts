import { UserData } from "../types/index";

export async function getUesrList(): Promise<UserData[]> {
  const api = "https://webcdn.17app.co/campaign/pretest/data.json";
  const response = await fetch(api);
  return response.json();
}
