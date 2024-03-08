import { getToken } from "#auth";
import { Sort } from "@fusionauth/typescript-client";
import { client } from "../../../utils/server/fusionauth";

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
    const clientResponse = await client.searchUsersByQuery({
      search: {
        queryString: "*",
        sortFields: [{ name: "email", order: Sort.asc }],
      },
    });
    return {
      user: clientResponse.response,
    };
  } catch (e) {
    console.error(e);
    return e;
  }
});
