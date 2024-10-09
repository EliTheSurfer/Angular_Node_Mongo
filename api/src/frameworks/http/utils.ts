import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { FastifyReply } from 'fastify';

export const cacheControlDuration = {
  ONE_DAY: 24 * 60 * 60,
  SIX_HOURS: 6 * 60 * 60,
  ONE_HOUR: 1 * 60 * 60,
  FIVE_MINUTES: 5 * 60,
  FIVE_SECONDS: 5,
  TEN_SECONDS: 10,
  THIRTY_SECONDS: 30,
  ONE_MINUTE: 60,
};

interface Cache {
  duration: number;
  private?: boolean;
}

interface HttpError {
  statusCode?: number;
  message?: string;
  error?: string;
  code?: string;
}

type HttpConstant = keyof typeof StatusCodes;

const createHttpError = (error: HttpError) => error;

export const Http = {
  FROM(reply: FastifyReply, httpError: Partial<HttpError>) {
    const fallbackHttpCode = 'INTERNAL_SERVER_ERROR';
    return reply
      .code(httpError.statusCode ?? StatusCodes[fallbackHttpCode])
      .send(createHttpError({
        statusCode: httpError.statusCode ?? StatusCodes[fallbackHttpCode],
        message: httpError.message ?? ReasonPhrases[fallbackHttpCode],
        error: httpError.error ?? ReasonPhrases[fallbackHttpCode],
        code: httpError.code ?? fallbackHttpCode,
      }));
  },
  OK<T>(reply: FastifyReply, { value, cache }: { value: T; cache?: Cache }) {
    const withMaxAge = `max-age=${cache?.duration ?? cacheControlDuration.FIVE_MINUTES}`;

    return reply
      .header('cache-control', [cache?.private ? 'private' : '', withMaxAge].filter(Boolean).join(', '))
      .code(200)
      .send(value);
  },
  NO_CONTENT: (reply: FastifyReply) => reply.code(StatusCodes.NO_CONTENT).send(),
  NOT_FOUND: (reply: FastifyReply) => handleError(reply, 'NOT_FOUND'),
  INTERNAL_SERVER_ERROR: (reply: FastifyReply) => handleError(reply, 'INTERNAL_SERVER_ERROR'),
  BAD_REQUEST: (reply: FastifyReply) => handleError(reply, 'BAD_REQUEST'),
};

const getHttpError = (httpCode: HttpConstant) => ({
  statusCode: StatusCodes[httpCode],
  message: ReasonPhrases[httpCode],
  error: ReasonPhrases[httpCode],
  code: httpCode,
});

const handleError = (reply: FastifyReply, httpCode: HttpConstant) => reply
  .code(StatusCodes[httpCode])
  .send(getHttpError(httpCode));
