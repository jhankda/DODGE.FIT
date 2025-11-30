// utils/getIconComponent.ts
export const getIconComponent = async (iconName: string) => {
  switch (iconName) {
    case "yoga":
      return (await import("@assets/icons/yogaIcon.svg")).default;
    case "boxing":
      return (await import("@assets/icons/boxingIcon.svg")).default;
    case "swim":
      return (await import("@assets/icons/swimIcon.svg")).default;
    default:
      return null;
  }
};
