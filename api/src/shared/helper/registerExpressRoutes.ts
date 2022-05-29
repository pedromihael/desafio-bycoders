import { Request, Response } from "express"

export const registerExpressRoutes = (app: Express.Application, routes: any): void => {
  routes.forEach((route: { method: string | number; route: any; controller: any; action: string | number; }) => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
      const result = (new (route.controller as any))[route.action](req, res, next)
      if (result instanceof Promise) {
        result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

      } else if (result !== null && result !== undefined) {
        res.json(result)
      }
    })
  })
}