// One method for add custom property in promise. like AbortController

export class CustomPromise<T> extends Promise<T> {
  public controller: AbortController;

  constructor(
    executor: (
      resolve: (value: T | PromiseLike<T>) => void,
      reject: (reason?: any) => void,
    ) => void,
    controller: AbortController = new AbortController(),
  ) {
    super(executor);
    // console.log("controller", controller);
    this.controller = controller;
  }

  /**
   * 重写 then，确保返回的仍然是 CustomPromise（保留 controller）
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | PromiseLike<TResult1>)
      | null
      | undefined,
    onrejected?:
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | null
      | undefined,
  ): CustomPromise<TResult1 | TResult2> {
    return new CustomPromise<TResult1 | TResult2>(
      (resolve, reject) => {
        super.then(
          (value) => {
            try {
              // @ts-ignore
              resolve(onfulfilled ? onfulfilled(value) : value);
            } catch (err) {
              reject(err);
            }
          },
          (reason) => {
            if (onrejected) {
              try {
                resolve(onrejected(reason));
              } catch (err) {
                reject(err);
              }
            } else {
              reject(reason);
            }
          },
        );
      },
      this.controller, // 👈 关键：继承父级的 controller
    );
  }

  /**
   * 重写 catch，确保返回 CustomPromise 并保留 controller
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | PromiseLike<TResult>)
      | null
      | undefined,
  ): CustomPromise<T | TResult> {
    return new CustomPromise<T | TResult>((resolve, reject) => {
      super.catch((reason) => {
        if (onrejected) {
          try {
            resolve(onrejected(reason));
          } catch (err) {
            reject(err);
          }
        } else {
          reject(reason);
        }
      });
    }, this.controller);
  }

  /**
   * 重写 finally，虽然不传值，但也要保留 controller
   */
  finally(onfinally?: (() => void) | null | undefined): CustomPromise<T> {
    return new CustomPromise<T>((resolve, reject) => {
      super
        .finally(() => {
          try {
            onfinally?.();
          } finally {
            // 不修改 resolve/reject 行为
          }
        })
        .then(resolve, reject);
    }, this.controller);
  }
}

// Usage
/**
 *   return new CustomPromise((re, rj) => {
 *     promise.then(re).catch(rj)
 *   })
 */
