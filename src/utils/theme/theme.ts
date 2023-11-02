interface ITheme {
  colors: {
    primary: string;
    secondary: string;
  };
  fontSizes: {
    body: string;
    heading: string;
    heading2: string;
    icon: string;
  };
}

export const theme: ITheme = {
  colors: {
    primary: "#BABD92",
    secondary: "black",
  },
  fontSizes: {
    body: "1rem",
    heading: "1.85rem",
    heading2: "1.5rem", 
    icon: "1.5rem",
  },
};

export const getTheme = () => theme;
