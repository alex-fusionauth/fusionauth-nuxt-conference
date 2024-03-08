import { getToken } from "#auth";
import { client } from "../../../../utils/server/fusionauth";

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

  try {
    const clientResponse = await client.retrieveUser(token.sub);
    return {
      user: clientResponse.response.user,
    };
  } catch (e) {
    console.error(JSON.stringify(e));
    return e;
  }
});
