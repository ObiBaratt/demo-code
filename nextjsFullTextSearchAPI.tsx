import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const searchReq = req.query.search as string;
  const searchText = searchReq.trim().split(" ").join(" & ") + ":*";

  const RESULT_NAME_1 = await prisma.TABLENAME_REMOVED.findMany({
    where: {
      KEY_REMOVED: {
        search: searchText,
      },
    },
  });

  const RESULT_NAME_2 = await prisma.OTHER_TABLENAME.findMany({
    where: {
      OTHER_KEY: {
        search: searchText,
      },
    },
  });

  const data = {
    RESULT_1: RESULT_NAME_1 ? RESULT_NAME_1 : null,
    RESULT_2: RESULT_NAME_2 ? RESULT_NAME_2 : null,
  };

  return res.status(200).send(data);
};

export default handler;
