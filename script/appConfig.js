const AppConfig = {
    regex: {
        email: /^[a-zA-Z0-9._%+-]+@(?!gmail\.com$|yahoo\.com$|outlook\.com$|hotmail\.com$|icloud\.com$)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        password: {
                lowercase: /[a-z]/,
                uppercase: /[A-Z]/,
                digit: /\d/,
                special: /[@$!%*?&^#]/,
                minLength: 8
        },
        name: /^[A-Za-z]{2,}(?:[ .'-][A-Za-z]+)*$/
    },
    url:{
        google_sheet_leads:"https://script.google.com/macros/s/AKfycbzjwJ2dojcRdw87nXbN6zN1-uY6J7Ip6_sBCNEA5uLR9Py99WzZMLGstOgHZ6Hm3pgZ/exec"
    }
};
