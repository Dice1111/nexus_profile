// Helper functions to convert HEX to RGBA and HSVA
export function hexToRgba(hex: string, alpha: number = 1){
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b, a: alpha };
  };
  
  export function rgbaToHsva ({
    r,
    g,
    b,
    a,
  }: {
    r: number;
    g: number;
    b: number;
    a: number;
  }){
    r /= 255;
    g /= 255;
    b /= 255;
  
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
  
    let h = 0;
    if (delta) {
      if (max === r) h = ((g - b) / delta) % 6;
      else if (max === g) h = (b - r) / delta + 2;
      else h = (r - g) / delta + 4;
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  
    const s = max === 0 ? 0 : delta / max;
    const v = max;
  
    return {
      h,
      s: Math.round(s * 100),
      v: Math.round(v * 100),
      a: Math.round(a * 100) / 100,
    };
  };



  export const colorPresets = [
    { name: "Red", color: "#FF6347" },
    { name: "Green", color: "#32CD32" },
    { name: "Blue", color: "#1E90FF" },
    { name: "Yellow", color: "#FFD700" },
    { name: "Purple", color: "#800080" },
    { name: "Orange", color: "#FFA500" },
    { name: "Gray", color: "#808080" },
    { name: "Gold", color: "#FFD900" },
    { name: "Turquoise", color: "#40E0D0" },
    { name: "Pink", color: "#FFC0CB" },
    { name: "Teal", color: "#008080" },
    { name: "Lavender", color: "#E6E6FA" },
  ].map((preset) => {
    const rgba = hexToRgba(preset.color);
    const hsva = rgbaToHsva(rgba);
    return { ...preset, rgba, hsva };
  });