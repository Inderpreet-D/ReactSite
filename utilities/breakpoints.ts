interface Size {
  mobile: string[];
  tablet: string[];
  laptop: string[];
  desktop: string[];
}

interface Breakpoints {
  mobile: string;
  tablet: string;
  laptop: string;
  desktop: string;
}

const size: Size = {
  mobile: ["20rem", "30rem"],
  tablet: ["30.0625rem", "48rem"],
  laptop: ["48.0625rem", "64rem"],
  desktop: ["64.0625rem"],
};

const breakpoints: Breakpoints = {} as Breakpoints;

Object.keys(size).forEach((key) => {
  breakpoints[key] = size[key]
    .map(
      (size: string, i: number) => `(${i === 0 ? "min" : "max"}-width: ${size})`
    )
    .join(" and ");
});

export default breakpoints;