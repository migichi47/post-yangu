export function requireAccount(...allowedAccountTypes) {
  return function checkAccount(request, response, next) {
    const accountType =
      request.session?.accountType ||
      (request.session?.creatorId ? "creator" : "");
    const accountId =
      accountType === "creator"
        ? request.session.creatorId
        : accountType === "fan"
          ? request.session.fanId
          : null;

    if (!accountId || !allowedAccountTypes.includes(accountType)) {
      return response
        .status(accountId ? 403 : 401)
        .json({
          error: accountId ? "You are not allowed to do this." : "Not authenticated.",
        });
    }

    request.auth = { accountType, accountId };
    return next();
  };
}

export const requireFan = requireAccount("fan");
export const requireSignedIn = requireAccount("creator", "fan");
