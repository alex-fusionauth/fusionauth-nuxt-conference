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

  const body = await readBody(event);

  try {
    const clientResponse = await client.commentOnUser({
      userComment: {
        commenterId: token?.sub,
        userId: body.userId,
        comment: body.comment,
      },
    });
    return clientResponse.response;
  } catch (e) {
    console.error(JSON.stringify(e));
    return e;
  }
});
