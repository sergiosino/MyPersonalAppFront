export const linkedBankStatuses = [
    {
        statusShort: "CR",
        statusLong: "CREATED",
        description: "Requisition has been succesfully created",
        stage: 1,
        color: "#F68A1C"
    },
    {
        statusShort: "GC",
        statusLong: "GIVING_CONSENT",
        description: "User is giving consent at consent screen",
        stage: 2,
        color: "#F68A1C"
    },
    {
        statusShort: "UA",
        statusLong: "UNDERGOING_AUTHENTICATION",
        description: "User is redirected to the financial institution for authentication",
        stage: 3,
        color: "#F68A1C"
    },
    {
        statusShort: "RJ",
        statusLong: "REJECTED",
        description: "SSN verification has failed",
        stage: 4,
        color: "#D84646"
    },
    {
        statusShort: "SA",
        statusLong: "SELECTING_ACCOUNTS",
        description: "End-user is selecting accounts",
        stage: 5,
        color: "#F68A1C"
    },
    {
        statusShort: "GA",
        statusLong: "GRANTING_ACCESS",
        description: "End-user is granting access to their account information",
        stage: 6,
        color: "#F68A1C"
    },
    {
        statusShort: "LN",
        statusLong: "LINKED",
        description: "Account has been succesfully linked to requisition",
        stage: 7,
        color: "#4E9A51"
    },
    {
        statusShort: "SU",
        statusLong: "SUSPENDED",
        description: "Requisition is suspended due to numerous consecutive errors that happened while accessing its accounts",
        stage: 8,
        color: "#D84646"
    },
    {
        statusShort: "EX",
        statusLong: "EXPIRED",
        description: "Access to accounts has expired as set in End User Agreement",
        stage: 9,
        color: "#D84646"
    },
]