import React, { useEffect, useState } from "react";
import styled from "styled-components";

enum BotKey {
  Dev = "dev",
  Biz = "biz",
  Design = "design",
}

const BOT_LIST: readonly BotKey[] = [BotKey.Dev, BotKey.Biz, BotKey.Design];

const BOT_TITLES: Record<BotKey, string> = {
  [BotKey.Dev]: "DevBot.",
  [BotKey.Biz]: "BizBot.",
  [BotKey.Design]: "DesignBot.",
};

const BOT_COLORS: Record<BotKey, string> = {
  [BotKey.Dev]: "#1a1acf",
  [BotKey.Biz]: "rgb(238, 255, 5)",
  [BotKey.Design]: "rgb(255, 4, 209)",
};

const TEXT_HEIGHT_PX = 150;

const MainText = styled.div<{ bot: BotKey }>`
  line-height: ${TEXT_HEIGHT_PX}px;
  font-size: 15vh;
  color: white;
  text-align: left;
  font-weight: bold;
  font-family: "Roboto", sans-serif;
  opacity: 0;
  animation: fade-in 1s forwards 1.5s;

  @keyframes fade-in {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  color: ${({ bot }) => BOT_COLORS[bot]};
`;

const OverflowContainer = styled.div`
  position: relative;
  height: ${TEXT_HEIGHT_PX}px;
  width: 100%;
  overflow: hidden;
`;

const ScrollContainer = styled.div<{ scroll: number }>`
  position: absolute;
  top: -${({ scroll }) => scroll}px;
  transition: top 500ms;
`;

const SlotText = (): React.ReactElement => {
  const [scroll, setScroll] = useState(0);

  const animate = (): void => {
    setScroll((prev) => {
      // add scroll length
      const next = prev + TEXT_HEIGHT_PX;

      // if at the end of the list, reset to 0 scroll
      if (next === BOT_LIST.length * TEXT_HEIGHT_PX) {
        return 0;
      }

      // else return next scroll length
      return next;
    });
  };

  useEffect(() => {
    let intervalId: NodeJS.Timer | undefined;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(animate, 2000);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <OverflowContainer>
      <ScrollContainer scroll={scroll}>
        {BOT_LIST.map((bot) => (
          <MainText key={bot} bot={bot}>
            {BOT_TITLES[bot]}
          </MainText>
        ))}
      </ScrollContainer>
    </OverflowContainer>
  );
};

export default SlotText;
