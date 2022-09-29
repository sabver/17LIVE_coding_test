// jsonデータのタイプ定義
export interface UserData {
  userID: string;
  displayName: string;
  picture: string;
  score: number;
}

export interface User extends UserData {
  // 元のスコア
  oldScore: number;
  // 順位情報
  rank: number;
}