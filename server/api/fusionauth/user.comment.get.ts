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

  try {
    const clientResponse = await client.retrieveUserComments(id as string);
    return clientResponse.response.userComments;
  } catch (e) {
    console.error(e);
    return e;
  }
});
