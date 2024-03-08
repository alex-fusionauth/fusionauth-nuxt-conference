import { getToken } from "#auth";
import { FusionAuthClient } from "@fusionauth/typescript-client";

const fusionAuthApiKey = process.env.FUSIONAUTH_API_KEY;
const fusionAuthUrl = process.env.FUSIONAUTH_URL;
const missingError = "missing in environment variables.";
if (!fusionAuthApiKey) {
  throw Error("FUSIONAUTH_API_KEY" + missingError);
}
if (!fusionAuthUrl) {
  throw Error("FUSIONAUTH_URL" + missingError);
}
export default eventHandler(async (event) => {
  const token = await getToken({ event });
  if (!token) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }
  if (!token?.sub) {
    throw createError({
      statusCode: 401,
      message: "No sub in JWT",
    });
  }

  const client = new FusionAuthClient(fusionAuthApiKey, fusionAuthUrl);
  try {
    const clientResponse = await client.retrieveUser(token.sub);
    return {
      user: clientResponse.response.user,
    };
  } catch (e) {
    console.error(e);
    return e;
  }
});
