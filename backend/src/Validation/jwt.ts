import { Auth } from "@/app/Entities/Auth.entity";
import express from "express";
import jsonwt, { TokenExpiredError } from "jsonwebtoken";

export enum AuthToken {
  AccessToken = "Authentication",
  RefreshToken = "RefreshToken",
}

// Interfaces
export type TokenMap = Map<AuthToken, string>;

// Tipos
type GetTokenField = (req: express.Request) => TokenMap;
type RefreshAccessToken = (oldToken: Auth) => Auth;

type JwtValidated = [string | jsonwt.JwtPayload | null, Error | null];

export type JwtMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => void;

type JwtInfo = {
  getTokens: GetTokenField;
  refreshAccessToken: RefreshAccessToken;
};

// Constantes
const ALGORITHM: jsonwt.Algorithm = "HS256";

const AUTH_TOKEN: jsonwt.SignOptions = {
  expiresIn: 60,
  algorithm: ALGORITHM,
};
const REFRESH_TOKEN: jsonwt.SignOptions = {
  expiresIn: "1h",
  algorithm: ALGORITHM,
};

const AUTH_COOKIE_OPTIONS: express.CookieOptions = {
  sameSite: 'none',
  secure: true,
};
const REFRESH_COOKIE_OPTIONS: express.CookieOptions = {
  httpOnly: true,
  sameSite: 'none',
  secure: true,
};

const SECRET = process.env["SECRET"]!;

// Public functions
export function jwtMiddleware({
  getTokens,
  refreshAccessToken,
}: JwtInfo): JwtMiddleware {
  return (req, res, next) => {
    console.log(req.cookies);
    const tokenFields = getTokens(req);
    if (
      tokenFields.get(AuthToken.AccessToken) === undefined ||
      tokenFields.get(AuthToken.RefreshToken) === undefined
    ) {
      next(new TokenExpiredError("jwt must be provided", new Date()));
      return;
    }

    const [result, error] = verifyAuth(
      tokenFields.get(AuthToken.AccessToken)!,
      {
        algorithms: [ALGORITHM],
      },
    );

    if (error) {
      if (error.name === "TokenExpiredError") {
        const [result, error] = verifyAuth(
          tokenFields.get(AuthToken.RefreshToken)!,
          {
            algorithms: [ALGORITHM],
          },
        );

        if (error) {
          next(error);
          return;
        }

        const auth = refreshAccessToken(result! as Auth);

        setAuth(
          AuthToken.AccessToken,
          auth,
          AUTH_TOKEN,
          AUTH_COOKIE_OPTIONS,
          res,
        );

        req.auth = auth;

        next();
        return;
      }

      next(error);
      return;
    }

    const auth = result! as typeof req.auth;
    req.auth = auth;
    next();
  };
}

export function jwtErrorHandler(
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  switch (err.name) {
    case "TokenExpiredError":
      // Token valido porem expirado
      res.status(401).end();
      return;
    case "JsonWebTokenError":
      // Caso sem token ou token mal formatado.
      res.status(401).end();
      return;
  }

  next(err);
}

export function signIn(token: Auth, res: express.Response) {
  setAuth(AuthToken.AccessToken, token, AUTH_TOKEN, AUTH_COOKIE_OPTIONS, res);
  setAuth(
    AuthToken.RefreshToken,
    token,
    REFRESH_TOKEN,
    REFRESH_COOKIE_OPTIONS,
    res,
  );
}

export function signOut(res: express.Response) {
  res.cookie(AuthToken.AccessToken, "", {sameSite: 'none', secure: true});
  res.cookie(AuthToken.RefreshToken, "", {sameSite: 'none', secure: true});
}

// Private functions
function setAuth(
  cookieName: AuthToken,
  token: Auth,
  jwtOptions: jsonwt.SignOptions,
  cookieOptions: express.CookieOptions,
  res: express.Response,
) {
  const authToken = jsonwt.sign(token, SECRET, jwtOptions);
  res.cookie(cookieName, authToken, cookieOptions);
}

function verifyAuth(
  token: string,
  options: jsonwt.VerifyOptions,
): JwtValidated {
  let result: string | jsonwt.JwtPayload | null = null;
  let error: Error | null = null;

  jsonwt.verify(token, SECRET, options, (err, decoded) => {
    if (err) {
      error = err;
    } else {
      result = decoded!;
    }
  });

  return [result, error];
}
