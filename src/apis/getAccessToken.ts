import { auth, clerkClient } from '@clerk/nextjs/server';

export async function getAccessToken() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return null;
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
