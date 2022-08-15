export const linkedAccountsStatuses = [
    {
        statusLong: "DISCOVERED",
        description: "User has succesfully authenticated herself, and account has been discovered",
        color: "#F68A1C"
    },
    {
        statusLong: "ERROR",
        description: "An error was encountered when processing account",
        color: "#D84646"
    },
    {
        statusLong: "EXPIRED",
        description: "Access to account has expired",
        color: "#D84646"
    },
    {
        statusLong: "PROCESSING",
        description: "Account is being processed by the institution",
        color: "#F68A1C"
    },
    {
        statusLong: "READY",
        description: "Account has been successfully processed",
        color: "#4E9A51"
    },
    {
        statusLong: "SUSPENDED",
        description: "Account has been suspended (more than 10 consecutive failed attempts to access the account)",
        color: "#D84646"
    }
]