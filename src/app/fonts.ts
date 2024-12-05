import localFont from "next/font/local";

export const clashGrotesk = localFont({
  src: [
    { path: "../../public/fonts/ClashGrotesk-Light.ttf", weight: "300" },
    { path: "../../public/fonts/ClashGrotesk-Regular.ttf", weight: "400" },
    { path: "../../public/fonts/ClashGrotesk-Medium.ttf", weight: "500" },
    { path: "../../public/fonts/ClashGrotesk-Semibold.ttf", weight: "600" },
    { path: "../../public/fonts/ClashGrotesk-Bold.ttf", weight: "700" },
  ],
  variable: "--font-clashGrotesk",
});

export const alliance = localFont({
  variable: "--font-alliance",
  src: [
    {
      path: "../../public/fonts/AllianceLight.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/AllianceRegular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/AllianceMedium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/AllianceSemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/AllianceBold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/AllianceExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/AllianceBlack.otf",
      weight: "900",
      style: "normal",
    },
  ],
});
