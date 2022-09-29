import Item, { ItemAbsContainer } from "../../components/Item";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { UserData, User } from "../../types/index";
import Welcome from "../../components/Welcome";

import { getUesrList } from "../../services/index";

import styled from "styled-components";
import {
  ITEM_HEIGHT,
  PRO_THRESHOLD,
  UPDATE_INTERVAL,
  ADD_SCORE_BASE,
} from "../../types/magic_number";

const Container = styled.div`
  box-sizing: border-box;
  position: relative;

  width: 100%;
`;

const Index = () => {
  const [list, setList] = useState<User[]>([]);
  const totalHeight = useMemo(() => {
    return ITEM_HEIGHT * list.length;
  }, [list]);

  /**
   * Scoreに基づき、userIDと配列のランキングのマップ情報を取り出し
   * @param list
   * @returns
   */
  const getRankMap = (list: UserData[] | User[]) => {
    const map = new Map<string, number>();
    const rankList: UserData[] = Object.create(list).sort(
      (a: UserData, b: UserData) => {
        // scoreの情報だけ考慮した
        return b.score - a.score;
      }
    );
    rankList.forEach((user, index) => {
      map.set(user.userID, index);
    });
    return map;
  };

  // データ初期化
  const initData = useCallback(() => {
    getUesrList().then((data) => {
      // userID -> rank
      const map = getRankMap(data);
      const list = data.map((user) => {
        const rank = map.get(user.userID);
        return {
          ...user,
          oldScore: user.score,
          rank: rank ?? 0,
        };
      });
      setList(list);
    });
  }, []);

  // データ更新
  const updateData = useCallback(() => {
    const newData = list.map((user) => {
      // scoreが増やす確率
      const isAdd = Math.random() >= PRO_THRESHOLD;
      const addScore = isAdd ? ADD_SCORE_BASE * Math.random() : 0;
      const oldScore = user.score;
      return {
        ...user,
        oldScore: oldScore,
        score: oldScore + parseInt(String(addScore)),
      };
    });
    // userID -> rank
    const map = getRankMap(list);
    // update rank
    newData.forEach((item) => {
      const rank = map.get(item.userID);
      item.rank = rank ?? 0;
    });
    setList(newData);
  }, [list]);

  useEffect(() => {
    if (list.length === 0) {
      initData();
    }
  }, [initData, list]);

  useEffect(() => {
    if (list.length > 0) {
      //   console.log("update data");
      const interval = setInterval(() => {
        // update data
        updateData();
      }, UPDATE_INTERVAL);
      return () => clearInterval(interval);
    }
  }, [list.length, updateData]);

  return (
    <>
      {list.length === 0 && (
        <>
          <Welcome></Welcome>
        </>
      )}
      {list.length > 0 && (
        <>
          <Container
            style={{
              height: totalHeight + "px",
            }}
          >
            {/** listをソートしたら、アニメーションが効かなくなる */}
            {list.map((user) => (
              <ItemAbsContainer
                style={{
                  // transformを使うことでreflowを避ける
                  transform: `translateY(${user.rank * ITEM_HEIGHT + "px"})`,
                }}
                // ref={(item) => {
                //   if (item && item.style) {
                //     console.log(user.userID, item.style.transform);
                //     requestAnimationFrame(() => {
                //       item.style.transform = `translateY(${index * ITEM_HEIGHT + "px"})`;
                //     });
                //   }
                // }}
                key={user.userID}
              >
                <Item user={user} index={user.rank + 1}></Item>
              </ItemAbsContainer>
            ))}
          </Container>
        </>
      )}
    </>
  );
};
export default Index;
