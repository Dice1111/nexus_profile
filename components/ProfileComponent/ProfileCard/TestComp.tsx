"use client";

import { memo, useEffect, useRef } from "react";
import Apple from "./Apple";
import { useDesignState } from "@/state_management/design.state";
import Orange from "./Orange";
import Banana from "./Banana";

// interface TestCompProps {
//   backgroundcolor: string;
// }

const AppleMemo = memo(Apple);
const OrgMemo = memo(Orange);
const BaMemo = memo(Banana);

const TestComp = () => {
  useEffect(() => {
    console.log("TestComp mounted");
  }, []);

  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    console.log("🔄 TestComp re-rendered");
  });

  useEffect(() => {
    console.log("🎯 h1 rendered or updated", h1Ref.current);
  });

  //   console.log("TestComp rendered");

  const backgroundcolor = useDesignState((state) => state.backgroundColor);
  const foregroundcolor = useDesignState((state) => state.foregroundColor);

  return (
    <>
      <div>TestComp</div>
      <AppleMemo backgroundcolor={backgroundcolor} />
      <OrgMemo foreground={foregroundcolor} />
      <BaMemo />
      <h1 ref={h1Ref}>hello</h1>
    </>
  );
};

export default TestComp;
