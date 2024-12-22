import "server-only";

import { TORN_API_URL } from "./constants";
import { verifySession } from "./sessions";

export async function fetchFactionContributions(
  stat: string,
  timestamp: number = 0
) {
  const { apiKey } = await verifySession();

  let endpoint = `${TORN_API_URL}/faction/?selections=contributors&stat=${stat}&key=${apiKey}`;

  if (timestamp !== 0) {
    endpoint += `&timestamp=${timestamp}`;
  }

  const response = await fetch(endpoint, {
    cache: "force-cache",
    next: {
      tags: [`${stat}-contributiors`],
      revalidate: 60 * 60,
    },
  });

  if (!response.ok) {
    return {
      error: {
        status: response.status,
        message: response.statusText,
      },
    };
  }

  const data = await response.json();

  if (data.error) {
    return {
      error: {
        status: data.error.code,
        message: data.error.error,
      },
    };
  }

  return data.contributors[stat];
}

export async function fetchFactionMembers() {
  const { apiKey } = await verifySession();

  const response = await fetch(
    `${TORN_API_URL}/faction?selections=basic&key=${apiKey}`,
    {
      cache: "force-cache",
      next: {
        tags: ["members"],
        revalidate: 60 * 60,
      },
    }
  );

  if (!response.ok) {
    return {
      error: {
        status: response.status,
        message: response.statusText,
      },
    };
  }

  const data = await response.json();

  if (data.error) {
    return {
      error: {
        status: data.error.code,
        message: data.error.error,
      },
    };
  }

  if (!data.members) {
    return {
      error: {
        status: 500,
        message: "No members found",
      },
    };
  }

  return data.members;
}

export async function fetchMemberPersonalStats(
  tornId: string,
  stat: string[] = ["xantaken"],
  timestamp: number = 0
) {
  if (stat.length === 0) {
    return {
      error: {
        status: 400,
        message: "No stats provided",
      },
    };
  }

  if (stat.length > 10) {
    return {
      error: {
        status: 400,
        message: "Too many stats provided",
      },
    };
  }

  const { apiKey } = await verifySession();

  let endpoint = `${TORN_API_URL}/user/${tornId}?selections=personalstats&key=${apiKey}&stat=${stat.join(
    ","
  )}`;

  if (timestamp !== 0) {
    endpoint += `&timestamp=${timestamp}`;
  }

  const response = await fetch(endpoint, {
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24,
    },
  });

  if (!response.ok) {
    return {
      error: {
        status: response.status,
        message: response.statusText,
      },
    };
  }

  const data = await response.json();

  return data.personalstats;
}
