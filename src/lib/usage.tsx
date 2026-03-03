import { RateLimiterPrisma } from "rate-limiter-flexible";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const FREE_POINTS = 2;
const PRO_POINTS = 100; // Pro users get 100 points per month
const DURATION = 30 * 24 * 60 * 60; // 30 days in seconds
const GENERATION_COST = 1; // Each generation costs 1 point

export const getUsageTracker = async () => {
  const { has } = await auth();

  const hasProAccess = has({ plan: "pro" });

  const usageTracker = new RateLimiterPrisma({
    storeClient: prisma,
    tableName: "Usage",
    points: hasProAccess ? PRO_POINTS : FREE_POINTS, // Number of points
    duration: DURATION,
    keyPrefix: "usage",
  });

  return usageTracker;
};

export const consumeCredits = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const usageTracker = await getUsageTracker();
  const result = await usageTracker.consume(userId, GENERATION_COST);

  return result;
};

export const getUsageStatus = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const usageTracker = await getUsageTracker();
  const result = await usageTracker.get(userId);

  return result;
};
