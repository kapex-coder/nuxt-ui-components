import CardImageHorizontal from "./components/Builder/Card/Image/Horizontal.vue";

export const REGISTERED_COMPONENTS = [
  {
    component: CardImageHorizontal,
    name: "CardImageHorizontal",
    canHaveChildren: true,
    inputs: [
      {
        name: "content",
        type: "uiBlocks",
        defaultValue: []
      }
    ]
  },
];
