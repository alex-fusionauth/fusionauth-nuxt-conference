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

export const client = new FusionAuthClient(fusionAuthApiKey, fusionAuthUrl);
