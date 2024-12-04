import React from "react";

interface SvgWaveTemplateThreeProps {
  wave_color: string;
}

const SvgWaveTemplateThree = ({ wave_color }: SvgWaveTemplateThreeProps) => {
  return (
    <div className="w-full h-full">
      <svg
        width="100%"
        height="100%"
        id="svg"
        viewBox="0 0 1440 690"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0,700 L 0,262 C 111.37799043062202,223.93301435406698 222.75598086124404,185.866028708134 311,187 C 399.24401913875596,188.133971291866 464.3540669856459,228.4688995215311 557,308 C 649.6459330143541,387.5311004784689 769.8277511961722,506.2583732057416 876,541 C 982.1722488038278,575.7416267942584 1074.3349282296651,526.4976076555024 1166,516 C 1257.6650717703349,505.5023923444976 1348.8325358851675,533.7511961722488 1440,562 L 1440,700 L 0,700 Z"
          stroke="none"
          strokeWidth="0"
          fill={wave_color}
          fillOpacity="1"
        ></path>
      </svg>
    </div>
  );
};

export default SvgWaveTemplateThree;
