import { getToken } from "#auth";
import { client } from "../../../utils/server/fusionauth";

export default eventHandler(async (event) => {
  const { id } = getQuery(event);
  if (!id) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  console.log("id", id);
  try {
    const clientResponse = await client.retrieveUser(id as string);
    return {
      user: clientResponse.response.user,
    };
  } catch (e) {
    console.error(e);
    return e;
  }
});
