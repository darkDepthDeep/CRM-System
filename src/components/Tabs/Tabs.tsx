import { useEffect } from "react";

import type { TabsProps, ParameterFilter } from "../../types/types";

import styles from "./Tabs.module.css";

 const Tabs: React.FC<TabsProps> = ({ error, counter, active, setActive, getTasks }) => {
  useEffect(() => {
    getTasks();
  }, [active]);

  const handleClickShow = (status: ParameterFilter): void => {
    setActive(status);
  };

  return error ? (
    <div className={styles["tabs-error"]}>{error.message}</div>
  ) : (
    <>
      <div className={styles["tabs-header"]}>
        <button
          className={styles["tabs-header__btn"]}
          onClick={() => handleClickShow("all")}
          style={{ color: active === "all" ? "#1da7d8" : "#95969a" }}
        >
          Все({counter?.all || "0"})
        </button>
        <button
          className={styles["tabs-header__btn"]}
          onClick={() => handleClickShow("inWork")}
          style={{ color: active === "inWork" ? "#1da7d8" : "#95969a" }}
        >
          в работе({counter?.inWork || "0"})
        </button>
        <button
          className={styles["tabs-header__btn"]}
          onClick={() => handleClickShow("completed")}
          style={{ color: active === "completed" ? "#1da7d8" : "#95969a" }}
        >
          сделано({counter?.completed || "0"})
        </button>
      </div>
    </>
  );
}

export default Tabs;