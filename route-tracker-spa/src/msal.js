import {EventType} from "@azure/msal-browser";
import fetchWithToken from "./utils/fetchWithToken.js";

const msalSetup = (instance) => {
    if (!instance.getActiveAccount() && instance.getAllAccounts().length > 0) {
        // Account selection logic is app dependent. Adjust as needed for different use cases.
        instance.setActiveAccount(instance.getAllAccounts()[0]);
    }

    instance.addEventCallback((event) => {
        if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
            instance.setActiveAccount(event.payload.account);

            const newUser = event.payload.idTokenClaims.newUser === true
            if (newUser) {
                fetchWithToken(instance, "POST", "new-user", null, event.payload.accessToken).then();
            }
        }
    });
}

export default msalSetup;