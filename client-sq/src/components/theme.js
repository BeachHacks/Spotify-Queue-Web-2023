const themeDefinition = (mode) => ({
    palette: {
        mode,
        ...(mode === "light") ?
            {
                text: {
                    primary: "#3C435C",
                    secondary: "#A3A8BF"
                },
                background: {
                    primary: "#F6F8FF",
                    secondary: "#FFFFFF"
                },
                primary: {
                    main: "#496FFF"
                },
                common:{
                    border: "#E0E4F2",
                    misc: "#A3A8BF"
                }
            } :
            {
                text: {
                    primary: "#D6DDFF",
                    secondary: "#D6DDFF"
                },
                background: {
                    primary: "#151A28",
                    secondary: "#0F1521"
                },
                primary: {
                    main: "#496FFF"
                },
                common: {
                    border: "#202733"
                }
            }
    }
})

export default themeDefinition;
