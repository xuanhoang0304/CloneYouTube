import { clerkClient, currentUser } from '@clerk/nextjs/server';

export async function getAccessToken() {
    try {
        const user = await currentUser();
        const userId = user?.id;
        if (!userId) {
            return;
        }
        const clerk = clerkClient();
        const response = await clerk.users.getUserOauthAccessToken(
            userId || "",
            "oauth_google"
        );

        const token = response.data[0].token;
        return token;
    } catch (error) {
        console.error("Error in getAccessToken:", error);
        throw error;
    }
}

// this is the token I need to use to make requests to the gmail api
// destructuring it here for clarity you can also just use OauthAccessToken.token below
