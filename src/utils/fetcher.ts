export type CustomRequestInit = Omit<RequestInit, "signal">;

export type CustomError<T = unknown> = Pick<
  Response,
  "status" | "statusText" | "url"
> & {
  body: T;
};

export const request = (
  input: string | URL | globalThis.Request,
  init: CustomRequestInit = {},
) => {
  const controller = new AbortController();

  return Object.assign(
    fetch(input, {
      ...init,
      signal: controller.signal,
    }).then(async (res) => {
      let tmp: unknown = res;
      const contentType = res.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        tmp = await res.json();
      } else if (contentType && contentType.includes("text/plain")) {
        tmp = await res.text();
      } else {
        tmp = await res.blob();
      }

      if (res.status >= 200 && res.status < 300) {
        return tmp;
      } else {
        return Promise.reject<CustomError>({
          body: tmp,
          status: res.status,
          statusText: res.statusText,
          url: res.url,
        });
      }
    }),
    {
      abortController: controller,
    },
  );
};

export const createFetcher = (
  baseUrl: string,
  baseOpts: CustomRequestInit = {},
) => {
  const { pathname } = new URL(baseUrl);

  return {
    get(
      path: string,
      params?: Record<string, string>,
      opts: CustomRequestInit = {},
    ) {
      const url = new URL(
        `${pathname}${path}` + "?" + new URLSearchParams(params).toString,
        baseUrl,
      );

      return request(
        url,
        Object.assign(baseOpts, opts, {
          method: "get",
        }),
      );
    },
    post(path: string, params?: object, opts: CustomRequestInit = {}) {
      const url = new URL(`${pathname}${path}`, baseUrl);
      const tmp: CustomRequestInit = {
        ...opts,
        body: JSON.stringify(params),
        method: "post",
      };
      return request(url, Object.assign(baseOpts, tmp));
    },
  };
};
