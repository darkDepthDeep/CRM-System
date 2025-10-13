import React from 'react';

import {Button, Flex} from 'antd';
import type { TabsProps, ParameterFilter } from "../../types/types";

import styles from "./Tabs.module.css";

 const Tabs: React.FC<TabsProps> = ({counter, active, setActive }) => {
  

  const handleClickShow = (status: ParameterFilter): void => {
    setActive(status);
  };

  const activeStyleButton = (tab: string): React.CSSProperties => {
    return { 
      color: active === tab ? "#1da7d8" : "#95969a", 
      padding: 0,
    }
  }

  return (
    <Flex className={styles['tabs-header']}>
      <Button 
      type="text"
      className={styles['tabs-header__btn']}
      onClick={() => handleClickShow("all")}
      style={activeStyleButton('all')}
      >
        Все({counter?.all || "0"})
      </Button>
      <Button 
      type="text"
      className={styles['tabs-header__btn']}
      onClick={() => handleClickShow("inWork")}
      style={activeStyleButton("inWork")}
      >
        в работе({counter?.inWork || "0"})
      </Button>
      <Button 
      type="text"
      className={styles['tabs-header__btn']}
      onClick={() => handleClickShow("completed")}
      style={activeStyleButton("completed")}
      >
        сделано({counter?.completed || "0"})
      </Button>
    </Flex>
  );
}

export default React.memo(Tabs);