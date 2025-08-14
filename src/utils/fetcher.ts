import { httpStatus, merge, type HttpStatusCode } from "@shilong/utils";
import { toast } from "sonner";

export type CustomRequestInit = Omit<RequestInit, "signal">;
export type BaseOpts = CustomRequestInit & {
  getHeaders?: () => CustomRequestInit["headers"];
};

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

  const promise = fetch(input, {
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
      toast(
        tmp?.msg ??
          `${res.status}: ${res.statusText ? res.statusText : httpStatus[res.status as HttpStatusCode]?.msg}`,
      );
      return Promise.reject({
        body: tmp,
        status: res.status,
        statusText: res.statusText,
        url: res.url,
      });
    }
  });
  return { promise, controller };
};

export const createFetcher = (
  baseUrl: string,
  baseOpts: CustomRequestInit & {
    getHeaders?: () => CustomRequestInit["headers"];
  } = {},
) => {
  const { pathname } = new URL(baseUrl);
  const { getHeaders, ...resetBaseOpts } = baseOpts;

  const getHeaderFn = () => {
    if (typeof getHeaders === "function") {
      return getHeaders();
    }
    return {};
  };

  return {
    get(
      path: string,
      params?: Record<string, string>,
      opts: CustomRequestInit = {},
    ) {
      const url = new URL(
        `${pathname}${path}` + "?" + new URLSearchParams(params).toString(),
        baseUrl,
      );

      return request(
        url,
        merge({}, resetBaseOpts, opts, {
          method: "get",
          headers: {
            ...getHeaderFn(),
          },
        }),
      );
    },
    post(path: string, params?: object, opts: CustomRequestInit = {}) {
      const url = new URL(`${pathname}${path}`, baseUrl);

      return request(
        url,
        merge({}, resetBaseOpts, opts, {
          method: "post",
          body: JSON.stringify(params),
          headers: {
            "Content-Type": "application/json",
            ...getHeaderFn(),
          },
        }),
      );
    },
  };
};
