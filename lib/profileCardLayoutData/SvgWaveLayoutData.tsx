import SvgWaveTemplateOne from "@/components/ProfileSvgComponent/SvgWaveTemplateOne";
import SvgWaveTemplateThree from "@/components/ProfileSvgComponent/SvgWaveTemplateThree";
import SvgWaveTemplateTwo from "@/components/ProfileSvgComponent/SvgWaveTemplateTwo";

export enum SvgWaveLayoutType {
  WAVE_ONE = "wave_one",
  WAVE_TWO = "wave_two",
  WAVE_THREE = "wave_three",
}

export const svgWaveLayouts = [
  SvgWaveLayoutType.WAVE_ONE,
  SvgWaveLayoutType.WAVE_TWO,
  SvgWaveLayoutType.WAVE_THREE,
];

export const svgWaveLayoutData = {
  [SvgWaveLayoutType.WAVE_ONE]: <SvgWaveTemplateOne />,
  [SvgWaveLayoutType.WAVE_TWO]: <SvgWaveTemplateTwo />,
  [SvgWaveLayoutType.WAVE_THREE]: <SvgWaveTemplateThree />,
};
